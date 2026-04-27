import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import type { AdminRequest } from './AdminRegisterModal';
import './SuperAdminPanel.css';

interface SuperAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuperAdminPanel: React.FC<SuperAdminPanelProps> = ({ isOpen, onClose }) => {
  const { t } = useSettings();
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [approvedAdmins, setApprovedAdmins] = useState<AdminRequest[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    if (isOpen) {
      loadRequests();
    }
  }, [isOpen]);

  const loadRequests = () => {
    const stored = localStorage.getItem('simba_admin_requests');
    if (stored) {
      const allRequests: AdminRequest[] = JSON.parse(stored);
      setRequests(allRequests);
      setApprovedAdmins(allRequests.filter(r => r.status === 'approved'));
    }
  };

  const handleApprove = (email: string) => {
    const updated = requests.map(req =>
      req.email === email ? { ...req, status: 'approved' as const } : req
    );
    setRequests(updated);
    localStorage.setItem('simba_admin_requests', JSON.stringify(updated));
    
    // Update user role to admin
    const profiles = JSON.parse(localStorage.getItem('simba_profiles') || '{}');
    if (profiles[email]) {
      profiles[email].role = 'admin';
      localStorage.setItem('simba_profiles', JSON.stringify(profiles));
    }
    
    alert(`✅ Admin access approved for ${email}`);
    loadRequests();
  };

  const handleReject = (email: string) => {
    const updated = requests.map(req =>
      req.email === email ? { ...req, status: 'rejected' as const } : req
    );
    setRequests(updated);
    localStorage.setItem('simba_admin_requests', JSON.stringify(updated));
    alert(`❌ Admin access rejected for ${email}`);
    loadRequests();
  };

  const handleRevoke = (email: string) => {
    if (confirm(`Are you sure you want to revoke admin access for ${email}?`)) {
      const updated = requests.map(req =>
        req.email === email ? { ...req, status: 'rejected' as const } : req
      );
      setRequests(updated);
      localStorage.setItem('simba_admin_requests', JSON.stringify(updated));
      
      // Update user role back to customer
      const profiles = JSON.parse(localStorage.getItem('simba_profiles') || '{}');
      if (profiles[email]) {
        profiles[email].role = 'customer';
        localStorage.setItem('simba_profiles', JSON.stringify(profiles));
      }
      
      alert(`🔒 Admin access revoked for ${email}`);
      loadRequests();
    }
  };

  const filteredRequests = requests.filter(r => r.status === activeTab);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content superadmin-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2>👑 SuperAdmin Panel</h2>
          <p>Manage admin access requests and permissions</p>
        </div>

        <div className="superadmin-tabs">
          <button
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Pending ({requests.filter(r => r.status === 'pending').length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            ✅ Approved ({requests.filter(r => r.status === 'approved').length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'rejected' ? 'active' : ''}`}
            onClick={() => setActiveTab('rejected')}
          >
            ❌ Rejected ({requests.filter(r => r.status === 'rejected').length})
          </button>
        </div>

        <div className="superadmin-content">
          {filteredRequests.length === 0 ? (
            <div className="empty-state">
              <p>No {activeTab} requests</p>
            </div>
          ) : (
            <div className="requests-list">
              {filteredRequests.map((request, index) => (
                <div key={index} className={`request-card ${request.status}`}>
                  <div className="request-header">
                    <div>
                      <h3>{request.name}</h3>
                      <p className="request-email">{request.email}</p>
                      <p className="request-phone">📱 {request.phone}</p>
                    </div>
                    <span className={`status-badge ${request.status}`}>
                      {request.status === 'pending' && '⏳ Pending'}
                      {request.status === 'approved' && '✅ Approved'}
                      {request.status === 'rejected' && '❌ Rejected'}
                    </span>
                  </div>

                  <div className="request-body">
                    <div className="request-reason">
                      <strong>Reason:</strong>
                      <p>{request.reason}</p>
                    </div>
                    <div className="request-meta">
                      <span>Requested: {new Date(request.timestamp).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="request-actions">
                    {request.status === 'pending' && (
                      <>
                        <button
                          className="btn-approve"
                          onClick={() => handleApprove(request.email)}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="btn-reject"
                          onClick={() => handleReject(request.email)}
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}
                    {request.status === 'approved' && (
                      <button
                        className="btn-revoke"
                        onClick={() => handleRevoke(request.email)}
                      >
                        🔒 Revoke Access
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="superadmin-stats">
          <div className="stat-card">
            <span className="stat-value">{requests.filter(r => r.status === 'approved').length}</span>
            <span className="stat-label">Active Admins</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{requests.filter(r => r.status === 'pending').length}</span>
            <span className="stat-label">Pending Requests</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{requests.length}</span>
            <span className="stat-label">Total Requests</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPanel;
