import { useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

export const usePersonalization = () => {
  const { orders } = useCart();
  const { user } = useUser();

  const myItems = useMemo(() => {
    if (!user) return [];

    // Filter orders for the current user
    const userOrders = orders.filter(order => order.customerEmail === user.email);
    
    // Count frequency of each product
    const frequencyMap: Record<number, { product: any, count: number }> = {};
    
    userOrders.forEach(order => {
      order.items.forEach(item => {
        if (frequencyMap[item.id]) {
          frequencyMap[item.id].count += item.quantity;
        } else {
          frequencyMap[item.id] = {
            product: item,
            count: item.quantity
          };
        }
      });
    });

    // Sort by frequency and take top 8
    return Object.values(frequencyMap)
      .sort((a, b) => b.count - a.count)
      .map(item => item.product)
      .slice(0, 8);
  }, [orders, user]);

  const recentPurchases = useMemo(() => {
    if (!user) return [];
    
    const userOrders = orders
      .filter(order => order.customerEmail === user.email)
      .sort((a, b) => b.timestamp - a.timestamp);

    // Get unique items from the last 3 orders
    const items = new Set<number>();
    const recent = [];

    for (const order of userOrders.slice(0, 3)) {
      for (const item of order.items) {
        if (!items.has(item.id)) {
          items.add(item.id);
          recent.push(item);
        }
      }
    }

    return recent.slice(0, 8);
  }, [orders, user]);

  return { myItems, recentPurchases };
};
