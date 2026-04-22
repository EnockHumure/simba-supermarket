import React, { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react';
import productsData from '../simba_products.json';
import type { Product } from './CartContext';

interface ProductContextType {
  allProducts: Product[];
  toggleStock: (productId: number) => void;
  updatePrice: (productId: number, newPrice: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    // Load initial state from JSON, but we'll manage it in state for the session
    return productsData.products as Product[];
  });

  const toggleStock = useCallback((productId: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    ));
  }, []);

  const updatePrice = useCallback((productId: number, newPrice: number) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, price: newPrice } : p
    ));
  }, []);

  const value = useMemo(() => ({
    allProducts: products,
    toggleStock,
    updatePrice
  }), [products]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductData = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductData must be used within a ProductProvider');
  }
  return context;
};
