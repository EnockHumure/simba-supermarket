import React from 'react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onRoleSelect: (role: 'customer' | 'admin' | 'superadmin') => void;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  mode,
  onRoleSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-simba-ink/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-simba-bg rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <button className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl hover:bg-simba-primary hover:text-white transition-all z-10" onClick={onClose}>✕</button>
        
        <div className="p-8 md:p-16 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-black text-simba-ink leading-none">
              {mode === 'login' ? '🔑 Login As' : '✨ Create Account As'}
            </h2>
            <p className="text-simba-muted font-bold tracking-widest uppercase text-xs">Select your role to continue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              className="bg-white p-10 rounded-[32px] border-2 border-simba-line hover:border-simba-primary hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col items-center text-center gap-6"
              onClick={() => onRoleSelect('customer')}
            >
              <div className="text-6xl group-hover:scale-125 transition-transform duration-500">🛒</div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-simba-ink">Customer</h3>
                <p className="text-sm text-simba-muted leading-relaxed font-medium">Shop products and enjoy loyalty rewards</p>
              </div>
            </button>

            <button 
              className="bg-white p-10 rounded-[32px] border-2 border-simba-line hover:border-[#764ba2] hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col items-center text-center gap-6"
              onClick={() => onRoleSelect('admin')}
            >
              <div className="text-6xl group-hover:scale-125 transition-transform duration-500">🔐</div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-simba-ink">Admin</h3>
                <p className="text-sm text-simba-muted leading-relaxed font-medium">
                  {mode === 'signup' ? 'Request admin access to manage store' : 'Manage products, orders, and customers'}
                </p>
              </div>
            </button>

            {mode === 'login' ? (
              <button 
                className="bg-white p-10 rounded-[32px] border-2 border-simba-line hover:border-simba-orange hover:shadow-2xl hover:-translate-y-2 transition-all group flex flex-col items-center text-center gap-6"
                onClick={() => onRoleSelect('superadmin')}
              >
                <div className="text-6xl group-hover:scale-125 transition-transform duration-500">👑</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-simba-ink">SuperAdmin</h3>
                  <p className="text-sm text-simba-muted leading-relaxed font-medium">Full system control and admin approval</p>
                </div>
              </button>
            ) : (
              <div className="bg-simba-line/20 p-10 rounded-[32px] border-2 border-dashed border-simba-line flex flex-col items-center justify-center text-center gap-4 opacity-50">
                <div className="text-4xl">🚫</div>
                <p className="text-xs font-bold text-simba-muted uppercase tracking-widest leading-relaxed">SuperAdmin accounts are system-managed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
