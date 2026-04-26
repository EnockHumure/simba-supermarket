import React, { useMemo, useRef, useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider, useCart, type Product } from './context/CartContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { useProducts } from './hooks/useProducts';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import HeroCarousel from './components/HeroCarousel';
import CountingStats from './components/CountingStats';
import ScrollAnimation from './components/ScrollAnimation';
import CTABanner from './components/CTABanner';
import Testimonials from './components/Testimonials';
import AdminRegisterModal, { type AdminRequest } from './components/AdminRegisterModal';
import SuperAdminPanel from './components/SuperAdminPanel';
import UserModal from './components/UserModal';
import ProductModal from './components/ProductModal';
import BranchPanel from './components/BranchPanel';
import SimbaBot from './components/SimbaBot';
import ReviewModal from './components/ReviewModal';
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
    keywords?: string[];
    accent: string;
  }
> = {
  supermarket: {
    title: 'Supermarket',
    subtitle: 'Groceries, household essentials, drinks, and general shopping from Simba.',
    categories: ['General', 'Food Products', 'Kitchenware & Electronics', 'Baby Products', 'Sports & Wellness', 'Cosmetics & Personal Care'],
    accent: 'Supermarket',
  },
  restaurant: {
    title: 'Restaurant',
    subtitle: 'Coffee shop style picks, drinks, quick food, and ready-to-enjoy items.',
    categories: ['Alcoholic Drinks', 'General'],
    keywords: ['beer', 'wine', 'whisky', 'vodka', 'cognac', 'gin', 'rum', 'tequila', 'champagne', 'brandy', 'juice', 'soda', 'water', 'cola', 'sprite', 'fanta'],
    accent: 'Restaurant',
  },
  bakery: {
    title: 'Bakery',
    subtitle: 'Bread, pastries, cakes, breakfast items, and bakery factory products.',
    categories: ['Cosmetics & Personal Care', 'Alcoholic Drinks', 'General'],
    keywords: ['bread', 'cake', 'flour', 'sugar', 'butter', 'egg', 'yeast', 'biscuit', 'cookie', 'muffin', 'croissant', 'donut', 'pastry'],
    accent: 'Bakery',
  },
};

const simbaLocations = [
  {
    name: 'Union Trade Centre (City Center)',
    address: '1 KN 4 Ave, Kigali',
    coordinates: '3336+MHV',
    description: 'Largest supermarket in Kigali city center with cooked food section',
  },
  {
    name: 'Simba Remera',
    address: 'KN 5 Rd, Kigali',
    coordinates: '',
    description: 'Full grocery and home items selection',
  },
  {
    name: 'Simba Kacyiru',
    address: 'KG 541 St, Kigali',
    coordinates: '',
    description: 'Complete food and household products',
  },
  {
    name: 'Simba Nyarutarama',
    address: '24Q5+R2R, Kigali',
    coordinates: '24Q5+R2R',
    description: 'Full range of groceries and essentials',
  },
  {
    name: 'Simba Kimironko',
    address: 'KG 192 St, Kigali',
    coordinates: '342F+3V5',
    description: 'Popular neighborhood supermarket',
  },
  {
    name: 'Simba Nyamirambo',
    address: '23H4+26V, Kigali',
    coordinates: '23H4+26V',
    description: 'Local community supermarket',
  },
  {
    name: 'Simba Kicukiro',
    address: '24G3+MCV, Kigali',
    coordinates: '24G3+MCV',
    description: 'Convenient location for Kicukiro residents',
  },
  {
    name: 'Simba Gikondo',
    address: 'KK 35 Ave, Kigali',
    coordinates: '',
    description: 'Industrial area supermarket',
  },
  {
    name: 'Simba Kanombe',
    address: '24J3+Q3, Kigali',
    coordinates: '24J3+Q3',
    description: 'Airport area location',
  },
  {
    name: 'Simba Gisenyi',
    address: '8754+P7W, Gisenyi',
    coordinates: '8754+P7W',
    description: 'Western Rwanda branch',
  },
];

const rwandaLocations = simbaLocations.map(loc => loc.name);

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
  const [activeService, setActiveService] = useState<ServiceKey>('supermarket');
  const activeServiceMeta = serviceDefinitions[activeService];

  const {
    products,
    allProducts,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useProducts(activeServiceMeta.categories);

  const { user, isLoyal, activeDiscount, updateProfile, isAdmin, logout } = useUser();
  const { checkout, orders, submitReview } = useCart();
  const { language, t } = useSettings();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminRegisterOpen, setIsAdminRegisterOpen] = useState(false);
  const [isSuperAdminOpen, setIsSuperAdminOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reviewOrder, setReviewOrder] = useState<any>(null);
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('Union Trade Centre (City Center)');
  const productsRef = useRef<HTMLElement | null>(null);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const categoryCounts = useMemo(
    () =>
      allProducts.reduce<Record<string, number>>((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {}),
    [allProducts]
  );

  const serviceProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => 
      activeServiceMeta.categories.includes(product.category)
    );

    // Apply keyword filtering for restaurant and bakery
    if (activeService === 'restaurant' && activeServiceMeta.keywords) {
      return filtered.filter(product => 
        activeServiceMeta.keywords!.some(keyword => 
          product.name.toLowerCase().includes(keyword)
        )
      ).slice(0, 8);
    }

    if (activeService === 'bakery' && activeServiceMeta.keywords) {
      return filtered.filter(product => 
        activeServiceMeta.keywords!.some(keyword => 
          product.name.toLowerCase().includes(keyword)
        )
      ).slice(0, 8);
    }

    return filtered.slice(0, 8);
  }, [activeServiceMeta.categories, activeServiceMeta.keywords, activeService, allProducts]);

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

  const handleCheckout = (branchName: string, pickupTime: string, paymentMethod: string, momoDeposit?: number) => {
    if (!user) {
      window.alert('Please login to place an order.');
      setIsUserModalOpen(true);
      return;
    }

    const newTotal = (user.totalPurchases || 0) + 1;
    updateProfile(user.email, { totalPurchases: newTotal });
    checkout(user.email, user.name, user.phone, branchName, pickupTime, paymentMethod, momoDeposit);
    
    const depositMsg = momoDeposit ? ` A deposit of ${momoDeposit} RWF has been charged via Mobile Money.` : '';
    window.alert(`✅ Order confirmed!\n\nPick-up: ${branchName}\nTime: ${pickupTime}\nPayment: ${paymentMethod}${depositMsg}\n\nYou can track your order status in your order history.`);
    setIsCartOpen(false);
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (reviewOrder) {
      submitReview(reviewOrder.id, rating, comment);
      window.alert(t('reviewSuccess'));
      setReviewOrder(null);
    }
  };

  // Check for picked up orders that haven't been reviewed
  const unreviewed = orders.filter(
    o => o.status === 'picked_up' && !o.reviewed && o.customerEmail === user?.email
  );

  // Auto-prompt for review after 2 seconds if there are unreviewed orders
  React.useEffect(() => {
    if (unreviewed.length > 0 && !reviewOrder) {
      const timer = setTimeout(() => {
        setReviewOrder(unreviewed[0]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [unreviewed.length, reviewOrder]);

  const openAdminPanel = () => {
    if (!isAdmin) {
      window.alert(t('unauthorizedAdmin'));
      return;
    }

    setIsAdminOpen(true);
  };

  const handleAdminRequest = (request: AdminRequest) => {
    const existing = localStorage.getItem('simba_admin_requests');
    const requests: AdminRequest[] = existing ? JSON.parse(existing) : [];
    requests.push(request);
    localStorage.setItem('simba_admin_requests', JSON.stringify(requests));
    alert('✅ Admin request submitted! You will be notified once reviewed by superadmin.');
  };

  const openSuperAdmin = () => {
    // Check if user is superadmin (phone: 0788695675 and password: Mataru@8)
    if (user?.phone !== '+250788695675') {
      alert('🔒 Only SuperAdmin can access this panel');
      return;
    }
    setIsSuperAdminOpen(true);
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
        onLogout={handleLogout}
      />

      <main className="app-shell">
        <HeroCarousel onAction={scrollToProducts} />
        
        <Hero
          activeService={activeService}
          onServiceChange={setActiveService}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          onPrimaryAction={scrollToProducts}
          serviceDefinitions={serviceDefinitions}
          locationOptions={rwandaLocations}
        />

        <CountingStats
          stats={[
            { value: 1000, label: 'Happy Customers', suffix: '+' },
            { value: 600, label: 'Products Available', suffix: '+' },
            { value: 10, label: 'Store Locations' },
            { value: 5, label: 'Years Experience' },
          ]}
        />

        {user && (
          <section className={`welcome-banner ${activeDiscount > 0 ? 'vip' : ''}`}>
            <div>
              <p className="section-kicker">{t('yourSimbaAccount')}</p>
              <h2>{t('welcomeMessage')}, {user.name}.</h2>
              <p>
                {t('deliveringToAccount')} <strong>{selectedLocation}</strong> {t('forAccount')} <strong>{user.email}</strong>.
              </p>
            </div>
            <div className="welcome-banner-meta">
              <div>
                <span className="welcome-banner-label">{t('completedOrders')}</span>
                <strong>{user.totalPurchases || 0}</strong>
              </div>
              <div>
                <span className="welcome-banner-label">{t('adminDiscount')}</span>
                <strong>{activeDiscount}%</strong>
              </div>
              <div>
                <span className="welcome-banner-label">{t('status')}</span>
                <strong>{isLoyal ? t('priorityShopper') : t('standardShopper')}</strong>
              </div>
            </div>
          </section>
        )}

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{t(activeService)}</p>
              <h2>{t(activeService)}</h2>
            </div>
            <button className="ghost-button" onClick={scrollToProducts}>
              {t('browseCatalogue')}
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
                <span className="highlight-label">{t('estimatedKigaliDelivery')}</span>
              </div>
              <div className="highlight-card">
                <span className="highlight-value">{categories.length}</span>
                <span className="highlight-label">{t('storeDepartments')}</span>
              </div>
              <div className="highlight-card">
                <span className="highlight-value">{allProducts.length}+</span>
                <span className="highlight-label">{t('productsInDataset')}</span>
              </div>
            </section>

            <section className="dual-panel">
              <div className="panel">
                <div className="section-heading compact">
                  <div>
                    <p className="section-kicker">{t('budgetLane')}</p>
                    <h3>{t('lowPricePicks')}</h3>
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
                    <p className="section-kicker">{t('bigBasket')}</p>
                    <h3>{t('premiumProducts')}</h3>
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
                  <p className="section-kicker">{t('mainShop')}</p>
                  <h2>{selectedCategory ? translateCategoryLabel(selectedCategory, language) : t('everythingOnSimba')}</h2>
                  <p>
                    {searchTerm
                      ? `${t('showingResults')} "${searchTerm}" ${t('inCatalogue')}.`
                      : `${t('browseProducts')} ${selectedLocation}.`}
                  </p>
                </div>
                <div className="catalogue-meta">
                  <span>{products.length} {t('results')}</span>
                  <button className="ghost-button" onClick={() => setSelectedCategory(null)}>
                    {t('resetFilter')}
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
                    <h3>{t('noProductsTitle')}</h3>
                    <p>{t('noProductsDesc')}</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{t('personalizedBlock')}</p>
              <h2>{user ? t('pickedForYou') : t('starterBasket')}</h2>
              <p>{t('personalizedDesc')}</p>
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
            <p className="section-kicker">{t('heroKicker')}</p>
            <h2>{t('friendlyShopping')}</h2>
            <p>{t('simpleFlow')}</p>
          </div>
          <div className="download-actions">
            <button className="primary-button" onClick={scrollToProducts}>
              {t('startShopping')}
            </button>
            {isAdmin && (
              <button className="primary-button" onClick={openAdminPanel} style={{ background: 'linear-gradient(135deg, #4caf50, #2e7d32)' }}>
                🔐 {t('adminAccess')}
              </button>
            )}
          </div>
        </section>

        <ScrollAnimation animation="fadeIn">
          <Testimonials />
        </ScrollAnimation>

        <ScrollAnimation animation="zoom">
          <div className="admin-access-section">
            <div className="admin-access-card">
              <div className="admin-icon">🔐</div>
              <h3>Admin Access</h3>
              <p>Request admin privileges to manage Simba Supermarket operations</p>
              <button className="admin-request-btn" onClick={() => setIsAdminRegisterOpen(true)}>
                📝 Request Admin Access
              </button>
            </div>
            {user?.phone === '+250788695675' && (
              <div className="admin-access-card superadmin">
                <div className="admin-icon">👑</div>
                <h3>SuperAdmin Panel</h3>
                <p>Manage admin requests and system permissions</p>
                <button className="superadmin-btn" onClick={openSuperAdmin}>
                  👑 Open SuperAdmin Panel
                </button>
              </div>
            )}
          </div>
        </ScrollAnimation>

        <section className="section bottom-grid">
          <div className="panel faq-panel">
            <div className="section-heading compact">
              <div>
                <p className="section-kicker">FAQ</p>
                <h3>{t('faqTitle')}</h3>
              </div>
            </div>
            <div className="faq-list">
              <button
                className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}
                onClick={() => setActiveFaq(0)}
              >
                <span>{t('faq1Q')}</span>
                <p>{activeFaq === 0 ? t('faq1A') : t('tapToExpand')}</p>
              </button>
              <button
                className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}
                onClick={() => setActiveFaq(1)}
              >
                <span>{t('faq2Q')}</span>
                <p>{activeFaq === 1 ? t('faq2A') : t('tapToExpand')}</p>
              </button>
              <button
                className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}
                onClick={() => setActiveFaq(2)}
              >
                <span>{t('faq3Q')}</span>
                <p>{activeFaq === 2 ? t('faq3A') : t('tapToExpand')}</p>
              </button>
            </div>
          </div>

          <div className="panel coverage-panel">
            <div className="section-heading compact">
              <div>
                <p className="section-kicker">{t('coverage')}</p>
                <h3>{t('rwandaDelivery')}</h3>
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
              <strong>{t('currentDropZone')}:</strong> {selectedLocation}
            </div>
          </div>
        </section>

        <section className="section locations-section">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{t('visitUs')}</p>
              <h2>{t('locationsTitle')}</h2>
              <p>{t('locationsDesc')}</p>
            </div>
          </div>
          <div className="locations-grid">
            {simbaLocations.map((location, idx) => (
              <div key={idx} className="location-card">
                <div className="location-header">
                  <span className="location-number">{idx + 1}</span>
                  <h4>{location.name}</h4>
                </div>
                <div className="location-body">
                  <p className="location-address">
                    <span className="location-icon">📍</span>
                    {location.address}
                  </p>
                  <p className="location-description">{location.description}</p>
                  {location.coordinates && (
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.coordinates + ' ' + location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="location-map-link"
                    >
                      {t('viewOnMaps')} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {isAdmin && (
        <div className="admin-access-fixed" onClick={openAdminPanel}>
          🔐 {t('adminAccess')}
        </div>
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout}
        selectedLocation={selectedLocation}
      />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <BranchPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <AdminRegisterModal 
        isOpen={isAdminRegisterOpen} 
        onClose={() => setIsAdminRegisterOpen(false)}
        onSubmit={handleAdminRequest}
      />
      <SuperAdminPanel 
        isOpen={isSuperAdminOpen} 
        onClose={() => setIsSuperAdminOpen(false)}
      />
      <SimbaBot onViewProduct={(product) => setSelectedProduct(product)} />
      {reviewOrder && (
        <ReviewModal
          order={reviewOrder}
          onClose={() => setReviewOrder(null)}
          onSubmit={handleReviewSubmit}
        />
      )}

      <footer className="footer">
        <div className="footer-brand-section">
          <strong>Simba Rwanda</strong>
          <p>{t('footerDesc')}</p>
          <div className="footer-socials">
            <a href="https://www.facebook.com/simbasupermarket/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <a href="https://x.com/SimbaRwanda" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">X</a>
            <a href="https://www.instagram.com/simba_supermarket/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            <a href="https://share.google/D9neQXWE1MfMeNz81" target="_blank" rel="noopener noreferrer" className="location-link" aria-label="Simba Locations">{t('visitUs')}</a>
          </div>
        </div>
        <p className="footer-copyright">{t('copyright')}</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </SettingsProvider>
  );
};

export default App;
