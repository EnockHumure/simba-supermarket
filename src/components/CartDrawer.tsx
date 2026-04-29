import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import DeliveryMap from './DeliveryMap';
import { simbaLocations } from '../locations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (branchName: string, pickupTime: string, paymentMethod: string, momoDeposit?: number) => void;
  selectedLocation: string;
}

const pickupTimes = [
  { value: '15min', label: 'Express (15-20 min)' },
  { value: '30min', label: 'Standard (30-40 min)' },
  { value: '1hour', label: '1 Hour' },
  { value: '2hours', label: '2 Hours' },
  { value: 'today', label: 'Later Today' },
];

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout, selectedLocation }) => {
  const { cart, addToCart, removeFromCart, totalPrice, subtotal, discount, clearCart } = useCart();
  const { activeDiscount } = useUser();
  const { t } = useSettings();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [pickupTime, setPickupTime] = useState('30min');
  const [showMap, setShowMap] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details'>('cart');
  const [paymentDetails, setPaymentDetails] = useState({
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const targetBranch = simbaLocations.find(l => l.name === selectedLocation) || simbaLocations[0];

  const handleCheckoutClick = () => {
    if (checkoutStep === 'cart') {
      setCheckoutStep('details');
    } else {
      const momoDeposit = paymentMethod === 'mobile' ? 1000 : undefined;
      onCheckout(selectedLocation, pickupTime, paymentMethod, momoDeposit);
      setCheckoutStep('cart');
    }
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <aside className="relative w-full max-w-[460px] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-simba-line flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-simba-orange leading-none mb-1">{t('yourOrder')}</p>
            <h2 className="text-xl font-black text-simba-ink">{checkoutStep === 'cart' ? t('simbaCart') : 'Payment Details'}</h2>
          </div>
          <button className="w-10 h-10 rounded-full bg-simba-bg flex items-center justify-center text-lg hover:bg-simba-primary hover:text-white transition-all" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              <span className="text-6xl">🛒</span>
              <h3 className="text-lg font-black text-simba-ink">{t('emptyCartTitle')}</h3>
              <p className="text-sm text-simba-muted max-w-[280px]">{t('emptyCartBody')}</p>
            </div>
          ) : checkoutStep === 'cart' ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-simba-bg border border-simba-line items-center">
                  <div className="w-16 h-16 bg-white rounded-lg p-2 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-simba-ink truncate">{item.name}</p>
                    <span className="text-[10px] text-simba-muted font-bold block mt-0.5">{item.price.toLocaleString()} RWF each</span>
                    <div className="flex items-center gap-3 mt-2 bg-white rounded-lg p-1 border border-simba-line w-fit">
                      <button className="w-6 h-6 flex items-center justify-center font-black text-simba-primary hover:bg-simba-bg rounded-md" onClick={() => removeFromCart(item.id)}>-</button>
                      <span className="text-xs font-black min-w-[16px] text-center">{item.quantity}</span>
                      <button className="w-6 h-6 flex items-center justify-center font-black text-simba-primary hover:bg-simba-bg rounded-md" onClick={() => addToCart(item)}>+</button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-black text-simba-ink">{(item.price * item.quantity).toLocaleString()} RWF</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <button className="text-xs font-bold text-simba-primary flex items-center gap-2 hover:underline" onClick={() => setCheckoutStep('cart')}>
                ← Back to Items
              </button>
              
              {paymentMethod === 'mobile' && (
                <div className="space-y-3 p-5 rounded-2xl bg-simba-bg border border-simba-line">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-simba-ink">Mobile Money Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="078... or 079..." 
                      className="w-full p-3 rounded-xl border border-simba-line bg-white focus:border-simba-primary outline-none text-sm font-bold transition-all"
                      value={paymentDetails.phone}
                      onChange={handleDetailChange}
                    />
                    <p className="text-[10px] text-simba-muted font-medium">Enter your MoMo or Airtel number for the 1,000 RWF deposit.</p>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4 p-5 rounded-2xl bg-simba-bg border border-simba-line">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-simba-ink">Card Number</label>
                    <input 
                      type="text" 
                      name="cardNumber"
                      placeholder="4444 4444 4444 4444" 
                      className="w-full p-3 rounded-xl border border-simba-line bg-white focus:border-simba-primary outline-none text-sm font-bold"
                      value={paymentDetails.cardNumber}
                      onChange={handleDetailChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-simba-ink">Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiry"
                        placeholder="MM/YY" 
                        className="w-full p-3 rounded-xl border border-simba-line bg-white focus:border-simba-primary outline-none text-sm font-bold"
                        value={paymentDetails.expiry}
                        onChange={handleDetailChange}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-simba-ink">CVV</label>
                      <input 
                        type="text" 
                        name="cvv"
                        placeholder="123" 
                        className="w-full p-3 rounded-xl border border-simba-line bg-white focus:border-simba-primary outline-none text-sm font-bold"
                        value={paymentDetails.cvv}
                        onChange={handleDetailChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'cash' && (
                <div className="p-5 bg-simba-primary/5 border border-simba-primary rounded-2xl text-center">
                  <p className="text-sm font-medium text-simba-ink leading-relaxed">
                    No additional details needed for Cash on Delivery. You will pay when you pick up your items at <strong className="font-black text-simba-primary">{selectedLocation}</strong>.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-simba-bg/50 border-t border-simba-line space-y-6">
            {checkoutStep === 'cart' && (
              <div className="space-y-6">
                <div className="space-y-2 border-b border-simba-line pb-4">
                  <div className="flex justify-between text-sm text-simba-muted font-medium">
                    <span>{t('subtotal')}</span>
                    <span>{subtotal.toLocaleString()} RWF</span>
                  </div>
                  {activeDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600 font-bold">
                      <span>{t('discount')} ({activeDiscount}%)</span>
                      <span>-{discount.toLocaleString()} RWF</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-black text-simba-primary pt-1">
                    <span>{t('total')}</span>
                    <span>{totalPrice.toLocaleString()} RWF</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-simba-muted">{t('pickupBranch')}</label>
                    <button className="text-[10px] font-black text-simba-primary underline" onClick={() => setShowMap(!showMap)}>
                      {showMap ? 'Hide Route' : 'Show Route'}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white border-2 border-simba-primary rounded-xl">
                    <span className="text-xl">📍</span>
                    <strong className="text-sm font-black text-simba-ink">{selectedLocation}</strong>
                  </div>
                  {showMap && <div className="h-40 rounded-xl overflow-hidden border border-simba-line shadow-inner"><DeliveryMap targetBranch={targetBranch} /></div>}
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-simba-muted">{t('pickupTime')}</label>
                  <select 
                    className="w-full p-3 rounded-xl border border-simba-line bg-white text-sm font-bold outline-none focus:border-simba-primary"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  >
                    {pickupTimes.map(time => (
                      <option key={time.value} value={time.value}>{time.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-simba-muted">{t('paymentMethod')}</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'card', icon: '💳', title: t('payWithCard'), sub: 'Visa / MasterCard' },
                      { id: 'cash', icon: '💵', title: t('payWithCash'), sub: 'Pay at branch' },
                      { id: 'mobile', icon: '📱', title: t('payWithMobile'), sub: 'MoMo / Airtel' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        className={`flex items-center gap-4 p-3 rounded-xl border-2 transition-all text-left ${paymentMethod === m.id ? 'border-simba-primary bg-simba-primary/5' : 'border-simba-line bg-white'}`}
                        onClick={() => setPaymentMethod(m.id)}
                      >
                        <span className="w-10 h-10 bg-simba-bg rounded-lg flex items-center justify-center text-xl">{m.icon}</span>
                        <div className="flex flex-col">
                          <strong className="text-xs font-black text-simba-ink leading-tight">{m.title}</strong>
                          <span className="text-[10px] text-simba-muted font-bold mt-0.5">{m.sub}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {paymentMethod === 'mobile' && (
                    <div className="flex gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <span className="text-lg">🔔</span>
                      <p className="text-[10px] font-medium text-yellow-800 leading-tight">A deposit of <strong>1,000 RWF</strong> will be charged via Mobile Money to confirm your order.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button className="w-full py-4 bg-simba-primary text-white rounded-xl font-black text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95" onClick={handleCheckoutClick}>
                {checkoutStep === 'cart' ? 'Continue to Payment' : t('confirmCheckout')}
              </button>
              {checkoutStep === 'cart' && (
                <button className="w-full text-xs font-bold text-simba-muted hover:text-simba-primary transition-colors underline" onClick={clearCart}>
                  {t('clearBasket')}
                </button>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
