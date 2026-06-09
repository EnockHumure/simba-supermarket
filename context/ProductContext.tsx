import React, { createContext, useContext, useState, useCallback, useMemo, useEffect, type ReactNode } from 'react';
import productsData from '../simba_products.json';
import type { Product } from './CartContext';

// Branch inventory tracking
export interface BranchInventory {
  [branchName: string]: {
    [productId: number]: number; // stock count
  };
}

interface ProductContextType {
  allProducts: Product[];
  branchInventory: BranchInventory;
  getStockForBranch: (productId: number, branchName: string) => number;
  updateBranchStock: (productId: number, branchName: string, quantity: number) => void;
  decrementStock: (productId: number, branchName: string, quantity: number) => void;
  getLowStockProducts: (branchName: string, threshold?: number) => Array<{ product: Product; stock: number }>;
  toggleStock: (productId: number) => void;
  updatePrice: (productId: number, newPrice: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const BRANCHES = [
  'Union Trade Centre (City Center)',
  'Simba Remera',
  'Simba Kacyiru',
  'Simba Nyarutarama',
  'Simba Kimironko',
  'Simba Nyamirambo',
  'Simba Kicukiro',
  'Simba Gikondo',
  'Simba Kanombe',
  'Simba Gisenyi',
];

// Initialize branch inventory with random stock levels
const initializeBranchInventory = (): BranchInventory => {
  const saved = localStorage.getItem('simba_branch_inventory');
  if (saved) {
    return JSON.parse(saved);
  }

  const inventory: BranchInventory = {};
  const products = productsData.products as Product[];

  BRANCHES.forEach(branch => {
    inventory[branch] = {};
    products.forEach(product => {
      // Random stock between 0-50 for variety
      inventory[branch][product.id] = Math.floor(Math.random() * 51);
    });
  });

  localStorage.setItem('simba_branch_inventory', JSON.stringify(inventory));
  return inventory;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    return productsData.products as Product[];
  });

  const [branchInventory, setBranchInventory] = useState<BranchInventory>(initializeBranchInventory);

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('simba_branch_inventory', JSON.stringify(branchInventory));
  }, [branchInventory]);

  const getStockForBranch = useCallback((productId: number, branchName: string): number => {
    return branchInventory[branchName]?.[productId] || 0;
  }, [branchInventory]);

  const updateBranchStock = useCallback((productId: number, branchName: string, quantity: number) => {
    setBranchInventory(prev => ({
      ...prev,
      [branchName]: {
        ...prev[branchName],
        [productId]: Math.max(0, quantity),
      },
    }));
  }, []);

  const decrementStock = useCallback((productId: number, branchName: string, quantity: number) => {
    setBranchInventory(prev => {
      const currentStock = prev[branchName]?.[productId] || 0;
      return {
        ...prev,
        [branchName]: {
          ...prev[branchName],
          [productId]: Math.max(0, currentStock - quantity),
        },
      };
    });
  }, []);

  const getLowStockProducts = useCallback((branchName: string, threshold: number = 10) => {
    const lowStock: Array<{ product: Product; stock: number }> = [];
    const branchStock = branchInventory[branchName] || {};

    products.forEach(product => {
      const stock = branchStock[product.id] || 0;
      if (stock > 0 && stock <= threshold) {
        lowStock.push({ product, stock });
      }
    });

    return lowStock.sort((a, b) => a.stock - b.stock);
  }, [branchInventory, products]);

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
    branchInventory,
    getStockForBranch,
    updateBranchStock,
    decrementStock,
    getLowStockProducts,
    toggleStock,
    updatePrice,
  }), [products, branchInventory, getStockForBranch, updateBranchStock, decrementStock, getLowStockProducts, toggleStock, updatePrice]);

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
