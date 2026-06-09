import React from 'react';
import { usePersonalization } from '../hooks/usePersonalization';
import { useUser } from '../context/UserContext';
import ProductCard from './ProductCard';
import { type Product } from '../context/CartContext';

interface MyItemsSectionProps {
  onProductClick: (product: Product) => void;
  viewMode: 'grid' | 'list';
}

const MyItemsSection: React.FC<MyItemsSectionProps> = ({ onProductClick, viewMode }) => {
  const { user } = useUser();
  const { myItems } = usePersonalization();

  if (!user || myItems.length === 0) return null;

  return (
    <section className="mt-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-6 border-b border-simba-line pb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-simba-primary">Your Favorites</span>
          <h2 className="text-2xl font-black text-simba-ink mt-1">My Items</h2>
          <p className="text-xs text-simba-muted">Based on your frequent purchases at Simba.</p>
        </div>
        <button className="text-xs font-black text-simba-primary hover:underline uppercase tracking-wider">
          View All Favorites →
        </button>
      </div>

      <div className={`${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6' : 'flex flex-col gap-4'}`}>
        {myItems.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={onProductClick} 
            viewMode={viewMode} 
          />
        ))}
      </div>
    </section>
  );
};

export default MyItemsSection;
