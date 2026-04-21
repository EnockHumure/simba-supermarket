import React, { useState } from 'react';
import { useUser, type UserProfile } from '../context/UserContext';
import { useCart, type OrderStatus } from '../context/CartContext';
import { useProductData } from '../context/ProductContext';
import { useSettings } from '../context/SettingsContext';
import './AdminPanel.css';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'orders' | 'inventory' | 'customers';

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { allProfiles, updateProfile } = useUser();
  const { orders, updateOrderStatus } = useCart();
  const { allProducts, toggleStock } = useProductData();
  const { t } = useSettings();
  const [activeTab, setActiveTab] = useState<AdminTab>('orders');

  if (!isOpen) {
    return null;
  }

  const handleDiscountChange = (email: string, discount: number) => {
    updateProfile(email, { manualDiscount: discount });
  };

  const profilesArray = Object.values(allProfiles);

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(event) => event.stopPropagation()}>
        <div className="admin-header">
          <div>
            <p className="section-kicker">Back office</p>
            <h2>Simba Ops Manager</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            x
          </button>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Live Orders ({orders.filter(o => o.status !== 'delivered').length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
          <button 
            className={`tab-btn ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            Loyalty
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'orders' && (
            <div className="admin-section">
              <h3>Real-time Order Flow</h3>
              <p className="admin-description">Manage the picking, packing, and delivery lifecycle like Getir.</p>
              
              <div className="order-grid">
                {orders.length === 0 ? (
                  <div className="empty-state">No active orders in the queue.</div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className={`order-card status-${order.status}`}>
                      <div className="order-card-header">
                        <strong>{order.id}</strong>
                        <span>{new Date(order.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="order-items">
                        {order.items.map(item => (
                          <div key={item.id} className="order-item">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                      <div className="order-actions">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        >
                          <option value="received">Received</option>
                          <option value="picking">Picking</option>
                          <option value="packing">Packing</option>
                          <option value="on_way">On the Way</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="admin-section">
              <h3>Global Stock Control</h3>
              <p className="admin-description">Toggle product availability. Changes reflect instantly on the storefront.</p>
              
              <div className="inventory-list">
                {allProducts.map(product => (
                  <div key={product.id} className="inventory-item">
                    <img src={product.image} alt={product.name} />
                    <div className="inventory-info">
                      <strong>{product.name}</strong>
                      <span>{product.category}</span>
                    </div>
                    <button 
                      className={`stock-toggle ${product.inStock ? 'in-stock' : 'out-stock'}`}
                      onClick={() => toggleStock(product.id)}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="admin-section">
              <h3>Customer Loyalty Management</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Orders</th>
                    <th>Manual Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {profilesArray.length === 0 ? (
                    <tr>
                      <td colSpan={4}>No customer profiles stored yet.</td>
                    </tr>
                  ) : (
                    profilesArray.map((profile: UserProfile) => (
                      <tr key={profile.phone || profile.email}>
                        <td>{profile.name}</td>
                        <td>{profile.phone || profile.email}</td>
                        <td>{profile.totalPurchases || 0}</td>
                        <td>
                          <select
                            value={profile.manualDiscount || 0}
                            onChange={(event) => handleDiscountChange(profile.email, parseInt(event.target.value, 10))}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

export default AdminPanel;
