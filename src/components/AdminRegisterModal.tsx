import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import './AdminRegisterModal.css';

interface AdminRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminRequest) => void;
}

export interface AdminRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  reason: string;
  timestamp: number;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminRegisterModal: React.FC<AdminRegisterModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    reason: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.reason) {
      alert('Please fill all fields');
      return;
    }

    const request: AdminRequest = {
      ...formData,
      timestamp: Date.now(),
      status: 'pending',
    };

    onSubmit(request);
    setFormData({ name: '', email: '', phone: '', password: '', reason: '' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content admin-register-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <h2>🔐 Admin Access Request</h2>
          <p>Request admin privileges for Simba Supermarket</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-register-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+250788695675"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a strong password"
              minLength={6}
              required
            />
          </div>

          <div className="form-group">
            <label>Reason for Admin Access</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Explain why you need admin access..."
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Request
            </button>
          </div>
        </form>

        <div className="admin-note">
          <strong>Note:</strong> Your request will be reviewed by the superadmin. You'll be notified once approved.
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterModal;
