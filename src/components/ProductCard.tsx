import React from 'react';
import { useCart, type Product } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { translateProductLabel } from '../i18n';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  viewMode: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, viewMode }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const { language, t } = useSettings();
  
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  if (viewMode === 'list') {
    return (
      <div 
        className="flex items-center gap-6 p-4 bg-white border border-simba-line rounded-xl hover:shadow-md transition-shadow cursor-pointer group"
        onClick={() => onClick(product)}
      >
        <div className="w-20 h-20 bg-simba-bg rounded-lg p-2 flex-shrink-0">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-simba-muted">{product.category}</span>
          <h3 className="text-sm font-bold text-simba-ink mt-1">{translateProductLabel(product.name, language)}</h3>
          <p className="text-xs text-simba-muted mt-0.5">{product.unit}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-black text-simba-ink mb-2">{product.price.toLocaleString()} RWF</div>
          <div className="flex items-center gap-3 bg-simba-bg rounded-lg p-1 border border-simba-line" onClick={e => e.stopPropagation()}>
            {quantity > 0 ? (
              <>
                <button className="w-7 h-7 flex items-center justify-center font-black text-simba-primary hover:bg-white rounded-md transition-colors" onClick={() => removeFromCart(product.id)}>-</button>
                <span className="text-xs font-black min-w-[16px] text-center">{quantity}</span>
                <button className="w-7 h-7 flex items-center justify-center font-black text-simba-primary hover:bg-white rounded-md transition-colors" onClick={() => addToCart(product)}>+</button>
              </>
            ) : (
              <button 
                className="px-4 py-1 text-xs font-black text-simba-primary hover:bg-white rounded-md transition-colors"
                onClick={() => addToCart(product)}
              >
                + ADD
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <article 
      className="bg-white border border-simba-line rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col h-full group"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-square p-6 bg-[#fdfdfd] border-b border-simba-line overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-simba-ink text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1 gap-1">
        <span className="text-[9px] font-black text-simba-muted uppercase tracking-widest leading-none">{product.category}</span>
        <h3 className="text-[13px] font-bold text-simba-ink leading-tight line-clamp-2 min-h-[2.8em] mt-1">
          {translateProductLabel(product.name, language)}
        </h3>
        
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-black text-simba-ink">{product.price.toLocaleString()} RWF</span>
            <span className="text-[10px] text-simba-muted font-bold">{product.unit}</span>
          </div>

          <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
            {quantity > 0 ? (
              <div className="flex items-center gap-3 bg-simba-bg rounded-xl p-1 border border-simba-line">
                <button className="w-7 h-7 flex items-center justify-center font-black text-simba-primary hover:bg-white rounded-lg transition-colors" onClick={() => removeFromCart(product.id)}>-</button>
                <span className="text-xs font-black min-w-[16px] text-center">{quantity}</span>
                <button className="w-7 h-7 flex items-center justify-center font-black text-simba-primary hover:bg-white rounded-lg transition-colors" onClick={() => addToCart(product)}>+</button>
              </div>
            ) : (
              <button 
                className="w-9 h-9 flex items-center justify-center bg-simba-primary text-white rounded-xl font-black text-lg hover:shadow-lg active:scale-90 transition-all disabled:opacity-50"
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                aria-label={`Add ${translateProductLabel(product.name, language)} to cart`}
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
