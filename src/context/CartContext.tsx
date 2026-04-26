import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { useUser } from './UserContext';
import { useProductData } from './ProductContext';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  subcategoryId: number;
  inStock: boolean;
  image: string;
  unit: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'received' | 'assigned' | 'preparing' | 'ready' | 'picked_up' | 'cancelled';

export interface Review {
  id: string;
  orderId: string;
  customerEmail: string;
  customerName: string;
  branchName: string;
  rating: number; // 1-5
  comment: string;
  timestamp: number;
  flagged: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  timestamp: number;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  branchName: string;
  pickupTime?: string;
  paymentMethod: string;
  momoDeposit?: number;
  assignedTo?: string; // Staff member name
  assignedAt?: number;
  readyAt?: number;
  pickedUpAt?: number;
  reviewed?: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  checkout: (email: string, name: string, phone: string | undefined, branchName: string, pickupTime: string, paymentMethod: string, momoDeposit?: number) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignOrder: (orderId: string, staffName: string) => void;
  submitReview: (orderId: string, rating: number, comment: string) => void;
  toggleFlagReview: (reviewId: string) => void;
  getReviewsForBranch: (branchName: string) => Review[];
  orders: Order[];
  reviews: Review[];
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { activeDiscount } = useUser();
  const { decrementStock } = useProductData();
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const getOrders = (): Order[] => {
    const data = localStorage.getItem('simba_orders');
    return data ? JSON.parse(data) : [];
  };

  const saveOrders = (orders: Order[]) => {
    localStorage.setItem('simba_orders', JSON.stringify(orders));
    setOrders(orders);
  };

  const getReviews = (): Review[] => {
    const data = localStorage.getItem('simba_reviews');
    return data ? JSON.parse(data) : [];
  };

  const saveReviews = (reviews: Review[]) => {
    localStorage.setItem('simba_reviews', JSON.stringify(reviews));
    setReviews(reviews);
  };

  const [orders, setOrders] = useState<Order[]>(getOrders());
  const [reviews, setReviews] = useState<Review[]>(getReviews());

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = subtotal * (activeDiscount / 100);
  const totalPrice = subtotal - discount;

  const checkout = (email: string, name: string, phone: string | undefined, branchName: string, pickupTime: string, paymentMethod: string, momoDeposit?: number) => {
    if (cart.length === 0) return;
    
    // Decrement stock for each item at the selected branch
    cart.forEach(item => {
      decrementStock(item.id, branchName, item.quantity);
    });
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total: totalPrice,
      status: 'received',
      timestamp: Date.now(),
      customerEmail: email,
      customerName: name,
      customerPhone: phone,
      branchName,
      pickupTime,
      paymentMethod,
      momoDeposit,
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    clearCart();
  };

  const assignOrder = (orderId: string, staffName: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, assignedTo: staffName, assignedAt: Date.now(), status: 'assigned' as OrderStatus }
        : order
    );
    saveOrders(updatedOrders);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    saveOrders(updatedOrders);
  };

  const submitReview = (orderId: string, rating: number, comment: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const newReview: Review = {
      id: `REV-${Date.now()}`,
      orderId,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      branchName: order.branchName,
      rating,
      comment,
      timestamp: Date.now(),
      flagged: false,
    };

    const updatedReviews = [newReview, ...reviews];
    saveReviews(updatedReviews);

    const updatedOrders = orders.map(o => 
      o.id === orderId ? { ...o, reviewed: true } : o
    );
    saveOrders(updatedOrders);
  };

  const toggleFlagReview = (reviewId: string) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId ? { ...review, flagged: !review.flagged } : review
    );
    saveReviews(updatedReviews);
  };

  const getReviewsForBranch = (branchName: string): Review[] => {
    return reviews.filter(review => review.branchName === branchName);
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      checkout,
      updateOrderStatus,
      assignOrder,
      submitReview,
      toggleFlagReview,
      getReviewsForBranch,
      orders,
      reviews,
      totalItems, 
      totalPrice, 
      subtotal, 
      discount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
