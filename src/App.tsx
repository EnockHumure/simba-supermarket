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
import AdminPanel from './components/AdminPanel';
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

  const { user, isLoyal, activeDiscount, updateProfile } = useUser();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleCheckout = () => {
    if (user) {
      const newTotal = (user.totalPurchases || 0) + 1;
      updateProfile(user.phone, { totalPurchases: newTotal });
      alert(`Checkout Successful! Total purchases for this number: ${newTotal}`);
      setIsCartOpen(false);
    }
  };

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
          <div className="admin-access" onClick={() => setIsAdminOpen(true)}>⚙️ Admin</div>
          {user && !selectedCategory && !searchTerm && (
            <div className={`welcome-banner ${activeDiscount > 0 ? 'vip' : ''}`}>
              <div>
                <h2>Welcome back, {user.name}!</h2>
                <p>Recognized Client: {user.phone}</p>
                {activeDiscount > 0 && <p className="discount-alert">🎉 Your Special Admin Discount: {activeDiscount}% OFF</p>}
              </div>
              {isLoyal && <div className="loyalty-badge">{activeDiscount > 0 ? 'VIP Loyalty' : 'Active Client'}</div>}
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
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout}
      />
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <SimbaBot onViewProduct={(p) => setSelectedProduct(p)} />
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
