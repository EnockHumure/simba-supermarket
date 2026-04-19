import React from 'react';
import { useUser, type UserProfile } from '../context/UserContext';
import './AdminPanel.css';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { allProfiles, updateProfile } = useUser();

  if (!isOpen) return null;

  const handleDiscountChange = (phone: string, discount: number) => {
    updateProfile(phone, { manualDiscount: discount });
  };

  const profilesArray = Object.values(allProfiles);

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <h2>🦁 Simba Admin: Loyalty Manager</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="admin-content">
          <p>Manage customer loyalty status and assign manual discounts.</p>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Purchases</th>
                <th>Manual Discount</th>
              </tr>
            </thead>
            <tbody>
              {profilesArray.length === 0 ? (
                <tr><td colSpan={4}>No customers registered yet.</td></tr>
              ) : (
                profilesArray.map((profile: UserProfile) => (
                  <tr key={profile.phone}>
                    <td>{profile.name}</td>
                    <td>{profile.phone}</td>
                    <td>{profile.totalPurchases || 0}</td>
                    <td>
                      <select 
                        value={profile.manualDiscount || 0}
                        onChange={(e) => handleDiscountChange(profile.phone, parseInt(e.target.value))}
                      >
                        <option value={0}>0% (Guest)</option>
                        <option value={5}>5% (Frequent)</option>
                        <option value={10}>10% (VIP)</option>
                        <option value={15}>15% (Elite)</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
