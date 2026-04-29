import React, { useMemo, useRef, useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider, useCart, type Product } from './context/CartContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroCarousel from './components/HeroCarousel';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Sidebar from './components/Sidebar';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import CountingStats from './components/CountingStats';
import AdminPanel from './components/AdminPanel';
import AdminRegisterModal, { type AdminRequest } from './components/AdminRegisterModal';
import SuperAdminPanel from './components/SuperAdminPanel';
import { InitializeSuperAdmin } from './components/InitializeSuperAdmin';
import UserModal from './components/UserModal';
import SimbaBot from './components/SimbaBot';
import SimbaExperience from './components/SimbaExperience';
import RoleSelectionModal from './components/RoleSelectionModal';
import ReviewModal from './components/ReviewModal';
import { translateCategoryLabel, translateProductLabel } from './i18n';
import simbaLogo from './simba-logo.png';

const AppContent: React.FC = () => {
  const { user, isAdmin, isSuperAdmin, logout } = useUser();
  const { products: allProducts } = useCart();
  const { language, t } = useSettings();
  const { checkout, orders, submitReview } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSuperAdminOpen, setIsSuperAdminOpen] = useState(false);
  const [isAdminRegisterOpen, setIsAdminRegisterOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Kigali CBD');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [reviewOrder, setReviewOrder] = useState<any>(null);

  const productSectionRef = useRef<HTMLDivElement>(null);

  const products = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      const matchesSubcategory = selectedSubcategory ? p.subcategoryId === selectedSubcategory : true;
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [allProducts, searchTerm, selectedCategory, selectedSubcategory]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allProducts.map((p) => p.category)));
    return cats.sort();
  }, [allProducts]);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckout = (branchName: string, pickupTime: string, paymentMethod: string, momoDeposit?: number) => {
    if (!user) {
      setIsUserModalOpen(true);
      return;
    }
    checkout(user.email, user.name, user.phone, branchName, pickupTime, paymentMethod, momoDeposit);
    setIsCartOpen(false);
    alert('Order placed successfully! Check your account for status.');
  };

  const handleAdminRequest = (request: AdminRequest) => {
    const existing = JSON.parse(localStorage.getItem('simba_admin_requests') || '[]');
    localStorage.setItem('simba_admin_requests', JSON.stringify([...existing, { ...request, status: 'pending', timestamp: Date.now() }]));
    alert('Your request has been submitted to the SuperAdmin for approval.');
  };

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (reviewOrder) {
      submitReview(reviewOrder.id, rating, comment);
      setReviewOrder(null);
      alert('Thank you for your review!');
    }
  };

  return (
    <div className="min-h-screen bg-simba-bg">
      <Navbar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCartClick={() => setIsCartOpen(true)}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        onLoginClick={() => setIsUserModalOpen(true)}
        onSignupClick={() => setIsUserModalOpen(true)}
        onLogout={logout}
      />

      <main className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-12">
        <div className="flex flex-col gap-12">
          <HeroCarousel onExplore={scrollToProducts} />
          <CountingStats />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <Sidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setSelectedSubcategory(null);
              scrollToProducts();
            }}
            selectedSubcategory={selectedSubcategory}
            onSelectSubcategory={(sub) => {
              setSelectedSubcategory(sub);
              scrollToProducts();
            }}
          />

          <div className="flex-1 min-w-0 flex flex-col gap-8" ref={productSectionRef}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-simba-line pb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-simba-orange leading-none">{t('supermarket')}</span>
                <h2 className="text-3xl font-black text-simba-ink mt-1">
                  {selectedCategory ? translateCategoryLabel(selectedCategory, language) : t('everythingOnSimba')}
                </h2>
              </div>
              
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex bg-white border border-simba-line rounded-lg p-1">
                  <button 
                    className={`px-4 py-1.5 rounded-md text-xs font-black transition-all ${viewMode === 'grid' ? 'bg-simba-primary text-white shadow-md' : 'text-simba-muted hover:text-simba-ink'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    Grid
                  </button>
                  <button 
                    className={`px-4 py-1.5 rounded-md text-xs font-black transition-all ${viewMode === 'list' ? 'bg-simba-primary text-white shadow-md' : 'text-simba-muted hover:text-simba-ink'}`}
                    onClick={() => setViewMode('list')}
                  >
                    List
                  </button>
                </div>
                <div className="ml-auto flex items-center gap-3">
                  <span className="text-xs font-bold text-simba-muted">{products.length} {t('results')}</span>
                  {selectedCategory && (
                    <button className="text-xs font-black text-simba-primary underline" onClick={() => setSelectedCategory(null)}>
                      {t('resetFilter')}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}`}>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} onClick={setSelectedProduct} viewMode={viewMode} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center flex flex-col items-center gap-3">
                  <span className="text-5xl">🔍</span>
                  <h3 className="text-lg font-black text-simba-ink">{t('noProductsTitle')}</h3>
                  <p className="text-sm text-simba-muted max-w-[300px]">{t('noProductsDesc')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <CTABanner onExplore={scrollToProducts} />
        
        <div className="flex flex-col gap-20">
          <SimbaExperience />
          <Testimonials />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-[32px] p-10 text-white text-center shadow-xl hover:-translate-y-2 transition-transform cursor-pointer group" onClick={() => setIsAdminOpen(true)}>
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">💼</div>
            <h3 className="text-2xl font-black mb-3">Simba Store Manager</h3>
            <p className="text-sm opacity-90 leading-relaxed mb-8">Manage orders, update stock levels, and oversee branch performance.</p>
            <button className="bg-white text-[#667eea] px-8 py-3 rounded-full font-black text-sm shadow-lg hover:shadow-xl transition-shadow">Access Branch Panel</button>
          </div>
          
          <div className="bg-gradient-to-br from-[#f093fb] to-[#f5576c] rounded-[32px] p-10 text-white text-center shadow-xl hover:-translate-y-2 transition-transform cursor-pointer group" onClick={() => setIsSuperAdminOpen(true)}>
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">👑</div>
            <h3 className="text-2xl font-black mb-3">Simba System Owner</h3>
            <p className="text-sm opacity-90 leading-relaxed mb-8">Global governance, revenue reports, and management approvals.</p>
            <button className="bg-white text-[#f5576c] px-8 py-3 rounded-full font-black text-sm shadow-lg hover:shadow-xl transition-shadow">Access Owner Panel</button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-simba-line pt-20 pb-10">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-md flex flex-col gap-6">
            <img src={simbaLogo} alt="Simba" className="h-10 w-fit object-contain" />
            <p className="text-sm text-simba-muted leading-relaxed">{t('footerDesc')}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="text-xs font-black text-simba-primary hover:underline">Instagram</a>
              <a href="#" className="text-xs font-black text-simba-primary hover:underline">Facebook</a>
              <a href="#" className="text-xs font-black text-simba-primary hover:underline">Twitter</a>
              <a href="#" className="bg-simba-secondary text-simba-ink px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">Visit Kigali Stores</a>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:text-right md:justify-end">
            <p className="text-[10px] font-black text-simba-muted uppercase tracking-[0.2em]">{t('copyright')}</p>
          </div>
        </div>
      </footer>

      {isSuperAdmin && (
        <button 
          className="fixed right-6 bottom-6 z-40 h-14 px-8 rounded-full bg-gradient-to-r from-green-500 to-green-700 text-white font-black text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          onClick={() => setIsSuperAdminOpen(true)}
        >
          🔐 {t('adminAccess')}
        </button>
      )}

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout}
        selectedLocation={selectedLocation}
      />
      
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        selectedLocation={selectedLocation}
      />
      
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

      <UserModal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} />
      <RoleSelectionModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} />
      <InitializeSuperAdmin />
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
