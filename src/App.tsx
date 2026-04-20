import React, { useMemo, useRef, useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { CartProvider, type Product } from './context/CartContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
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
import { translateCategoryLabel, translateProductLabel } from './i18n';

type ServiceKey =
  | 'supermarket'
  | 'restaurant'
  | 'bakery';

const serviceDefinitions: Record<
  ServiceKey,
  {
    title: string;
    subtitle: string;
    categories: string[];
    accent: string;
  }
> = {
  supermarket: {
    title: 'Supermarket',
    subtitle: 'Groceries, household essentials, drinks, and general shopping from Simba.',
    categories: ['General', 'Food Products', 'Kitchenware & Electronics', 'Baby Products'],
    accent: 'Supermarket',
  },
  restaurant: {
    title: 'Restaurant',
    subtitle: 'Coffee shop style picks, drinks, quick food, and ready-to-enjoy items.',
    categories: ['Food Products', 'Alcoholic Drinks', 'Cosmetics & Personal Care'],
    accent: 'Restaurant',
  },
  bakery: {
    title: 'Bakery',
    subtitle: 'Bread, pastries, cakes, breakfast items, and bakery factory products.',
    categories: ['Cosmetics & Personal Care', 'Food Products'],
    accent: 'Bakery',
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

  const { user, isLoyal, activeDiscount, updateProfile, isAdmin } = useUser();
  const { language, t } = useSettings();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeService, setActiveService] = useState<ServiceKey>('supermarket');
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
    updateProfile(user.email, { totalPurchases: newTotal });
    window.alert(`Checkout successful for ${user.name}. Total completed orders: ${newTotal}.`);
    setIsCartOpen(false);
  };

  const openAdminPanel = () => {
    if (!isAdmin) {
      window.alert(t('unauthorizedAdmin'));
      return;
    }

    setIsAdminOpen(true);
  };

  return (
    <div className="app">
      <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} />
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartClick={() => setIsCartOpen(true)}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        onLoginClick={() => setIsUserModalOpen(true)}
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

        {user && (
          <section className={`welcome-banner ${activeDiscount > 0 ? 'vip' : ''}`}>
            <div>
              <p className="section-kicker">Your Simba account</p>
              <h2>Murakaza neza, {user.name}.</h2>
              <p>
                Delivering to <strong>{selectedLocation}</strong> for account <strong>{user.email}</strong>.
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
                        <strong>{translateProductLabel(product.name, language)}</strong>
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
                        <strong>{translateProductLabel(product.name, language)}</strong>
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
                  <h2>{selectedCategory ? translateCategoryLabel(selectedCategory, language) : 'Everything on Simba'}</h2>
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
            <h2>Friendly shopping, faster browsing.</h2>
            <p>Search, categories, cart, optional login, and Simba assistant all stay available in one simple flow.</p>
          </div>
          <div className="download-actions">
            <button className="primary-button" onClick={scrollToProducts}>
              Start shopping
            </button>
            <button className="ghost-button dark" onClick={openAdminPanel}>
              {t('adminAccess')}
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

      {isAdmin && (
        <div className="admin-access" onClick={openAdminPanel}>
          {t('adminAccess')}
        </div>
      )}

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
    <SettingsProvider>
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>
    </SettingsProvider>
  );
};

export default App;
