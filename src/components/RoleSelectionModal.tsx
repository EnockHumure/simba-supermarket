import React from 'react';
import './RoleSelectionModal.css';

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content role-selection-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        
        <div className="role-modal-header">
          <h2>{mode === 'login' ? '🔑 Login As' : '✨ Create Account As'}</h2>
          <p>Select your role to continue</p>
        </div>

        <div className="role-cards">
          <button 
            className="role-card customer-card"
            onClick={() => onRoleSelect('customer')}
          >
            <div className="role-icon">🛒</div>
            <h3>Customer</h3>
            <p>Shop products and enjoy loyalty rewards</p>
          </button>

          {mode === 'signup' && (
            <button 
              className="role-card admin-card"
              onClick={() => onRoleSelect('admin')}
            >
              <div className="role-icon">🔐</div>
              <h3>Admin</h3>
              <p>Request admin access to manage store</p>
            </button>
          )}

          {mode === 'login' && (
            <>
              <button 
                className="role-card admin-card"
                onClick={() => onRoleSelect('admin')}
              >
                <div className="role-icon">🔐</div>
                <h3>Admin</h3>
                <p>Manage products, orders, and customers</p>
              </button>

              <button 
                className="role-card superadmin-card"
                onClick={() => onRoleSelect('superadmin')}
              >
                <div className="role-icon">👑</div>
                <h3>SuperAdmin</h3>
                <p>Full system control and admin approval</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
