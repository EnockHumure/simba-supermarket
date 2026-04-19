import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { useProducts } from './hooks/useProducts';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
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

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="app">
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
          {!selectedCategory && !searchTerm && <Hero />}
          <header className="content-header">
            <h2>{selectedCategory || 'All Products'}</h2>
            <p className="product-count">{products.length} Products Found</p>
          </header>
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="no-products">No products found matching your search.</p>
            )}
          </div>
        </main>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <footer className="footer">
        <p>&copy; 2026 Simba Supermarket. Rwanda's Online Supermarket.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
