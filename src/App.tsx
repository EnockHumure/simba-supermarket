import React, { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { useProducts } from './hooks/useProducts';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import UserModal from './components/UserModal';
import ProductModal from './components/ProductModal';
import SimbaBot from './components/SimbaBot';
import type { Product } from './context/CartContext';
import './App.css';

const AppContent: React.FC = () => {
  const {
    products,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useProducts();

  const { user, isLoyal } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="app">
      <UserModal />
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartClick={() => setIsCartOpen(true)}
      />
      <div className="app-body">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <main className="main-content">
          {user && !selectedCategory && !searchTerm && (
            <div className="welcome-banner">
              <div>
                <h2>Welcome back, {user.name}!</h2>
                <p>Rwanda's finest groceries are waiting for you.</p>
              </div>
              {isLoyal && <div className="loyalty-badge">Loyalty Active</div>}
            </div>
          )}
          {!selectedCategory && !searchTerm && <Hero />}
          <header className="content-header">
            <h2>{selectedCategory || 'Our Fresh Collection'}</h2>
            <p className="product-count">{products.length} Items Available</p>
          </header>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onClick={(p) => setSelectedProduct(p)}
                />
              ))
            ) : (
              <p className="no-products">We couldn't find any products matching your search.</p>
            )}
          </div>
        </main>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
      <SimbaBot />
      <footer className="footer">
        <p>&copy; 2026 Simba Supermarket. Rwandan Quality, Delivered.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </UserProvider>
  );
};

export default App;
