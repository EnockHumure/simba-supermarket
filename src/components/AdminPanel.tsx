import React from 'react';
import { useUser, type UserProfile } from '../context/UserContext';
import { useSettings } from '../context/SettingsContext';
import './AdminPanel.css';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { allProfiles, updateProfile } = useUser();
  const { t } = useSettings();

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
            <h2>{t('adminTitle')}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            x
          </button>
        </div>

        <div className="admin-content">
          <p>{t('adminBody')}</p>

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
