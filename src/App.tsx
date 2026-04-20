import React, { useMemo, useRef, useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider, type Product } from './context/CartContext';
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
import './App.css';

type ServiceKey =
  | 'express'
  | 'fresh'
  | 'bakery'
  | 'home'
  | 'family'
  | 'essentials';

const serviceDefinitions: Record<
  ServiceKey,
  {
    title: string;
    subtitle: string;
    categories: string[];
    accent: string;
  }
> = {
  express: {
    title: 'Simba Express',
    subtitle: 'Daily essentials from Kigali in minutes.',
    categories: ['General', 'Food Products'],
    accent: 'Fast lane',
  },
  fresh: {
    title: 'Fresh Rwanda',
    subtitle: 'Milk, produce and market staples from the Simba catalogue.',
    categories: ['Food Products', 'General'],
    accent: 'Farm picks',
  },
  bakery: {
    title: 'Bakery Drop',
    subtitle: 'Bread, pastries and breakfast add-ons for the morning rush.',
    categories: ['Cosmetics & Personal Care', 'Food Products'],
    accent: 'Warm now',
  },
  home: {
    title: 'Home Setup',
    subtitle: 'Kitchen, cleaning and practical household goods in one order.',
    categories: ['Kitchenware & Electronics', 'General'],
    accent: 'House care',
  },
  family: {
    title: 'Family Basket',
    subtitle: 'Baby, personal care and bigger everyday baskets.',
    categories: ['Baby Products', 'Cosmetics & Personal Care'],
    accent: 'Parent picks',
  },
  essentials: {
    title: 'Weekend Stock-Up',
    subtitle: 'Drinks, pantry goods and larger-value refill orders.',
    categories: ['Alcoholic Drinks', 'General'],
    accent: 'Bulk value',
  },
};

const rwandaLocations = [
  'Kigali CBD',
  'Kimironko',
  'Kacyiru',
  'Remera',
  'Nyamirambo',
  'Kicukiro',
  'Nyarutarama',
  'Kanombe',
];

const faqs = [
  {
    question: 'How fast does Simba deliver in Kigali?',
    answer:
      'Express orders are positioned as 15 to 35 minute deliveries depending on the neighborhood and basket size.',
  },
  {
    question: 'Can I keep my loyalty profile on the new site?',
    answer:
      'Yes. Simba still identifies shoppers by their Rwandan phone number and restores visit history, loyalty status, and admin discounts.',
  },
  {
    question: 'Does Simba support bigger household orders?',
    answer:
      'Yes. The Rwanda-focused sections include fast baskets for quick orders and stock-up lanes for larger home orders.',
  },
];

const AppContent: React.FC = () => {
  const {
    products,
    allProducts,
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
  const [activeService, setActiveService] = useState<ServiceKey>('express');
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('Kigali CBD');
  const productsRef = useRef<HTMLElement | null>(null);

  const categoryCounts = useMemo(
    () =>
      allProducts.reduce<Record<string, number>>((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {}),
    [allProducts]
  );

  const activeServiceMeta = serviceDefinitions[activeService];

  const serviceProducts = useMemo(() => {
    return allProducts
      .filter((product) => activeServiceMeta.categories.includes(product.category))
      .slice(0, 8);
  }, [activeServiceMeta.categories, allProducts]);

  const freshDeals = useMemo(() => {
    return [...allProducts].sort((a, b) => a.price - b.price).slice(0, 4);
  }, [allProducts]);

  const premiumPicks = useMemo(() => {
    return [...allProducts].sort((a, b) => b.price - a.price).slice(0, 4);
  }, [allProducts]);

  const newForYou = useMemo(() => {
    if (!user) {
      return serviceProducts.slice(0, 4);
    }

    return allProducts
      .filter((product) => product.name.toLowerCase().includes('simba') || product.category === 'General')
      .slice(0, 4);
  }, [allProducts, serviceProducts, user]);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCheckout = () => {
    if (!user) {
      return;
    }

    const newTotal = (user.totalPurchases || 0) + 1;
    updateProfile(user.phone, { totalPurchases: newTotal });
    window.alert(`Checkout successful for ${user.name}. Total completed orders: ${newTotal}.`);
    setIsCartOpen(false);
  };

  return (
    <div className="app">
      <UserModal />
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartClick={() => setIsCartOpen(true)}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />

      <main className="app-shell">
        <Hero
          activeService={activeService}
          onServiceChange={setActiveService}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          onPrimaryAction={scrollToProducts}
          serviceDefinitions={serviceDefinitions}
          locationOptions={rwandaLocations}
        />

        <section className="campaign-grid">
          <button className="campaign-card campaign-card-orange" onClick={() => setActiveService('express')}>
            <span className="campaign-eyebrow">Rwanda launch</span>
            <h3>Simba now feels like a rapid delivery app, not just a catalogue.</h3>
            <p>Fast ordering, Kigali neighborhoods, and sharper merchandising all live on the homepage.</p>
          </button>
          <button className="campaign-card campaign-card-cream" onClick={() => setSelectedCategory('General')}>
            <span className="campaign-eyebrow">Smart basket</span>
            <h3>Jump straight into essentials and everyday refill products.</h3>
            <p>One tap takes shoppers into the broadest Simba inventory lane.</p>
          </button>
          <button className="campaign-card campaign-card-dark" onClick={() => setIsCartOpen(true)}>
            <span className="campaign-eyebrow">Live cart</span>
            <h3>Cart, loyalty, admin discounting and the Simba assistant still work.</h3>
            <p>The redesign keeps the full Simba flow instead of replacing it with a static mockup.</p>
          </button>
        </section>

        {user && (
          <section className={`welcome-banner ${activeDiscount > 0 ? 'vip' : ''}`}>
            <div>
              <p className="section-kicker">Your Simba account</p>
              <h2>Murakaza neza, {user.name}.</h2>
              <p>
                Delivering to <strong>{selectedLocation}</strong> with loyalty tracking on{' '}
                <strong>{user.phone}</strong>.
              </p>
            </div>
            <div className="welcome-banner-meta">
              <div>
                <span className="welcome-banner-label">Completed orders</span>
                <strong>{user.totalPurchases || 0}</strong>
              </div>
              <div>
                <span className="welcome-banner-label">Admin discount</span>
                <strong>{activeDiscount}%</strong>
              </div>
              <div>
                <span className="welcome-banner-label">Status</span>
                <strong>{isLoyal ? 'Priority shopper' : 'Standard shopper'}</strong>
              </div>
            </div>
          </section>
        )}

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{activeServiceMeta.accent}</p>
              <h2>{activeServiceMeta.title}</h2>
              <p>{activeServiceMeta.subtitle}</p>
            </div>
            <button className="ghost-button" onClick={scrollToProducts}>
              Browse full Simba catalogue
            </button>
          </div>
          <div className="service-spotlight-grid">
            {serviceProducts.map((product) => (
              <ProductCard key={`${activeService}-${product.id}`} product={product} onClick={setSelectedProduct} />
            ))}
          </div>
        </section>

        <section className="section app-body">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />

          <div className="market-content">
            <section className="market-highlights">
              <div className="highlight-card">
                <span className="highlight-value">15-35 min</span>
                <span className="highlight-label">estimated Kigali delivery</span>
              </div>
              <div className="highlight-card">
                <span className="highlight-value">{categories.length}</span>
                <span className="highlight-label">store departments live</span>
              </div>
              <div className="highlight-card">
                <span className="highlight-value">{allProducts.length}+</span>
                <span className="highlight-label">products in the Simba dataset</span>
              </div>
            </section>

            <section className="dual-panel">
              <div className="panel">
                <div className="section-heading compact">
                  <div>
                    <p className="section-kicker">Budget lane</p>
                    <h3>Low-price Simba picks</h3>
                  </div>
                </div>
                <div className="mini-product-list">
                  {freshDeals.map((product) => (
                    <button key={`deal-${product.id}`} className="mini-product-card" onClick={() => setSelectedProduct(product)}>
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.price.toLocaleString()} RWF</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel">
                <div className="section-heading compact">
                  <div>
                    <p className="section-kicker">Big basket</p>
                    <h3>Premium and larger-value products</h3>
                  </div>
                </div>
                <div className="mini-product-list">
                  {premiumPicks.map((product) => (
                    <button key={`premium-${product.id}`} className="mini-product-card" onClick={() => setSelectedProduct(product)}>
                      <img src={product.image} alt={product.name} loading="lazy" />
                      <div>
                        <strong>{product.name}</strong>
                        <span>{product.price.toLocaleString()} RWF</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="section product-section" ref={productsRef}>
              <div className="section-heading">
                <div>
                  <p className="section-kicker">Main shop</p>
                  <h2>{selectedCategory || 'Everything on Simba'}</h2>
                  <p>
                    {searchTerm
                      ? `Showing results for "${searchTerm}" in Simba's Rwanda catalogue.`
                      : `Browse all available products for ${selectedLocation}.`}
                  </p>
                </div>
                <div className="catalogue-meta">
                  <span>{products.length} results</span>
                  <button className="ghost-button" onClick={() => setSelectedCategory(null)}>
                    Reset filter
                  </button>
                </div>
              </div>

              <div className="product-grid">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
                  ))
                ) : (
                  <div className="empty-state">
                    <h3>No products matched that view.</h3>
                    <p>Try another Kigali service lane, clear the category filter, or search with a simpler product term.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Personalized block</p>
              <h2>{user ? 'Picked for your next Simba order' : 'A quick Simba starter basket'}</h2>
              <p>These products are surfaced to make the homepage feel closer to a modern delivery platform.</p>
            </div>
          </div>
          <div className="service-spotlight-grid">
            {newForYou.map((product) => (
              <ProductCard key={`personal-${product.id}`} product={product} onClick={setSelectedProduct} />
            ))}
          </div>
        </section>

        <section className="download-banner">
          <div>
            <p className="section-kicker">Simba Rwanda</p>
            <h2>Designed like a rapid-commerce landing page, built on your actual Simba data.</h2>
            <p>
              Search, category filtering, loyalty, chatbot assistance, admin discount management, modal product views,
              and the cart checkout flow all remain active inside the redesign.
            </p>
          </div>
          <div className="download-actions">
            <button className="primary-button" onClick={scrollToProducts}>
              Start shopping
            </button>
            <button className="ghost-button dark" onClick={() => setIsAdminOpen(true)}>
              Open admin loyalty panel
            </button>
          </div>
        </section>

        <section className="section bottom-grid">
          <div className="panel faq-panel">
            <div className="section-heading compact">
              <div>
                <p className="section-kicker">FAQ</p>
                <h3>Common Simba questions</h3>
              </div>
            </div>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <button
                  key={faq.question}
                  className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                  onClick={() => setActiveFaq(index)}
                >
                  <span>{faq.question}</span>
                  <p>{activeFaq === index ? faq.answer : 'Tap to expand'}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="panel coverage-panel">
            <div className="section-heading compact">
              <div>
                <p className="section-kicker">Coverage</p>
                <h3>Rwanda-oriented delivery messaging</h3>
              </div>
            </div>
            <div className="coverage-grid">
              {rwandaLocations.map((location) => (
                <button
                  key={location}
                  className={`coverage-chip ${selectedLocation === location ? 'active' : ''}`}
                  onClick={() => setSelectedLocation(location)}
                >
                  {location}
                </button>
              ))}
            </div>
            <div className="coverage-note">
              <strong>Current drop zone:</strong> {selectedLocation}
            </div>
          </div>
        </section>
      </main>

      <div className="admin-access" onClick={() => setIsAdminOpen(true)}>
        Admin loyalty
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckout={handleCheckout} />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <SimbaBot onViewProduct={(product) => setSelectedProduct(product)} />

      <footer className="footer">
        <div>
          <strong>Simba Rwanda</strong>
          <p>Rapid grocery experience inspired by Getir, adapted for Kigali and the Simba catalogue.</p>
        </div>
        <p>Copyright 2026 Simba Supermarket. Rwanda-focused commerce demo.</p>
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
