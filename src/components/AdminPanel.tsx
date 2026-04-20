import React from 'react';
import { useUser, type UserProfile } from '../context/UserContext';
import './AdminPanel.css';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { allProfiles, updateProfile } = useUser();

  if (!isOpen) {
    return null;
  }

  const handleDiscountChange = (phone: string, discount: number) => {
    updateProfile(phone, { manualDiscount: discount });
  };

  const profilesArray = Object.values(allProfiles);

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(event) => event.stopPropagation()}>
        <div className="admin-header">
          <div>
            <p className="section-kicker">Back office</p>
            <h2>Simba loyalty manager</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            x
          </button>
        </div>

        <div className="admin-content">
          <p>Manage shopper profiles, purchase counts, and manual loyalty discounts assigned to Rwanda phone numbers.</p>

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
                <tr>
                  <td colSpan={4}>No customer profiles have been stored yet.</td>
                </tr>
              ) : (
                profilesArray.map((profile: UserProfile) => (
                  <tr key={profile.phone}>
                    <td>{profile.name}</td>
                    <td>{profile.phone}</td>
                    <td>{profile.totalPurchases || 0}</td>
                    <td>
                      <select
                        value={profile.manualDiscount || 0}
                        onChange={(event) => handleDiscountChange(profile.phone, parseInt(event.target.value, 10))}
                      >
                        <option value={0}>0%</option>
                        <option value={5}>5%</option>
                        <option value={10}>10%</option>
                        <option value={15}>15%</option>
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
