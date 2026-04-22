import React, { useState, useMemo } from 'react';
import { useUser, type UserProfile } from '../context/UserContext';
import { useCart, type OrderStatus } from '../context/CartContext';
import { useProductData } from '../context/ProductContext';
import './AdminPanel.css';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'dashboard' | 'orders' | 'inventory' | 'customers';

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { allProfiles, updateProfile } = useUser();
  const { orders, updateOrderStatus } = useCart();
  const { allProducts, toggleStock } = useProductData();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [customerSearch, setCustomerSearch] = useState('');
  const [inventorySearch, setInventorySearch] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleDiscountChange = (email: string, discount: number) => {
    updateProfile(email, { manualDiscount: discount });
  };

  const filteredProfiles = Object.values(allProfiles).filter(p => 
    p.email.toLowerCase().includes(customerSearch.toLowerCase()) || 
    p.phone?.includes(customerSearch) ||
    p.name.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const filteredInventory = allProducts.filter(p =>
    p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    p.category.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  // Analytics
  const totalRevenue = useMemo(() => 
    orders.reduce((sum, order) => sum + order.total, 0), 
    [orders]
  );

  const activeOrders = useMemo(() => 
    orders.filter(o => o.status !== 'delivered').length,
    [orders]
  );

  const totalCustomers = Object.keys(allProfiles).length;

  const outOfStockCount = useMemo(() =>
    allProducts.filter(p => !p.inStock).length,
    [allProducts]
  );

  const topCustomers = useMemo(() => 
    Object.values(allProfiles)
      .sort((a, b) => (b.totalPurchases || 0) - (a.totalPurchases || 0))
      .slice(0, 5),
    [allProfiles]
  );

  const recentOrders = useMemo(() =>
    [...orders].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10),
    [orders]
  );

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(event) => event.stopPropagation()}>
        <div className="admin-header">
          <div>
            <p className="section-kicker">Simba Admin • 0788695675</p>
            <h2>Operations Dashboard</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 Orders ({activeOrders})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            📋 Inventory
          </button>
          <button 
            className={`tab-btn ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            👥 Customers ({totalCustomers})
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <div className="admin-section">
              <h3>Business Overview</h3>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <span className="stat-icon">💰</span>
                  <div>
                    <strong>{totalRevenue.toLocaleString()} RWF</strong>
                    <span>Total Revenue</span>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">📦</span>
                  <div>
                    <strong>{orders.length}</strong>
                    <span>Total Orders</span>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">👥</span>
                  <div>
                    <strong>{totalCustomers}</strong>
                    <span>Registered Customers</span>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">📋</span>
                  <div>
                    <strong>{allProducts.length}</strong>
                    <span>Products in Catalog</span>
                  </div>
                </div>
                <div className="stat-card alert">
                  <span className="stat-icon">⚠️</span>
                  <div>
                    <strong>{activeOrders}</strong>
                    <span>Active Orders</span>
                  </div>
                </div>
                <div className="stat-card alert">
                  <span className="stat-icon">❌</span>
                  <div>
                    <strong>{outOfStockCount}</strong>
                    <span>Out of Stock</span>
                  </div>
                </div>
              </div>

              <div className="dashboard-panels">
                <div className="panel">
                  <h4>Top 5 Customers</h4>
                  <div className="top-customers-list">
                    {topCustomers.map((customer, idx) => (
                      <div key={customer.email} className="top-customer-item">
                        <span className="rank">#{idx + 1}</span>
                        <div className="customer-info">
                          <strong>{customer.name}</strong>
                          <span>{customer.email}</span>
                        </div>
                        <div className="customer-stats">
                          <strong>{customer.totalPurchases || 0}</strong>
                          <span>orders</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="panel">
                  <h4>Recent Orders</h4>
                  <div className="recent-orders-list">
                    {recentOrders.map(order => (
                      <div key={order.id} className="recent-order-item">
                        <div>
                          <strong>{order.id}</strong>
                          <span>{new Date(order.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="order-status-badge">
                          <span className={`status-${order.status}`}>{order.status}</span>
                          <strong>{order.total.toLocaleString()} RWF</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="admin-section">
              <h3>Order Management</h3>
              <p className="admin-description">Track and update order status through the delivery pipeline.</p>
              
              <div className="order-grid">
                {orders.length === 0 ? (
                  <div className="empty-state">No orders yet. Waiting for first customer checkout.</div>
                ) : (
                  orders.map(order => (
                    <div key={order.id} className={`order-card status-${order.status}`}>
                      <div className="order-card-header">
                        <div>
                          <strong>{order.id}</strong>
                          <span>{new Date(order.timestamp).toLocaleString()}</span>
                        </div>
                        <strong className="order-total">{order.total.toLocaleString()} RWF</strong>
                      </div>
                      <div className="order-customer">
                        <span>Customer: {order.customerEmail}</span>
                      </div>
                      <div className="order-items">
                        {order.items.map(item => (
                          <div key={item.id} className="order-item">
                            <span>{item.quantity}x {item.name}</span>
                            <span>{(item.price * item.quantity).toLocaleString()} RWF</span>
                          </div>
                        ))}
                      </div>
                      <div className="order-actions">
                        <label>Status:</label>
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                        >
                          <option value="received">📥 Received</option>
                          <option value="picking">🛒 Picking</option>
                          <option value="packing">📦 Packing</option>
                          <option value="on_way">🚚 On the Way</option>
                          <option value="delivered">✅ Delivered</option>
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
              <h3>Inventory Control</h3>
              <div className="admin-search-bar">
                <input 
                  type="text" 
                  placeholder="Search products by name or category..." 
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                />
                <span className="search-count">{filteredInventory.length} products</span>
              </div>
              
              <div className="inventory-list">
                {filteredInventory.map(product => (
                  <div key={product.id} className="inventory-item">
                    <img src={product.image} alt={product.name} />
                    <div className="inventory-info">
                      <strong>{product.name}</strong>
                      <span>{product.category} • {product.price.toLocaleString()} RWF</span>
                    </div>
                    <button 
                      className={`stock-toggle ${product.inStock ? 'in-stock' : 'out-stock'}`}
                      onClick={() => toggleStock(product.id)}
                    >
                      {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="admin-section">
              <h3>Customer Loyalty Management</h3>
              <div className="admin-search-bar">
                <input 
                  type="text" 
                  placeholder="Search by name, email or phone..." 
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                />
                <span className="search-count">{filteredProfiles.length} customers</span>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Orders</th>
                    <th>Loyalty Discount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProfiles.length === 0 ? (
                    <tr>
                      <td colSpan={4}>No matching customers found.</td>
                    </tr>
                  ) : (
                    filteredProfiles.map((profile: UserProfile) => (
                      <tr key={profile.phone || profile.email}>
                        <td>
                          <strong>{profile.name}</strong>
                          {profile.manualDiscount > 0 && <span className="vip-badge">VIP</span>}
                        </td>
                        <td>
                          <div className="contact-cell">
                            <span>{profile.email}</span>
                            {profile.phone && <span className="phone-number">{profile.phone}</span>}
                          </div>
                        </td>
                        <td><strong>{profile.totalPurchases || 0}</strong></td>
                        <td>
                          <select
                            value={profile.manualDiscount || 0}
                            onChange={(event) => handleDiscountChange(profile.email, parseInt(event.target.value, 10))}
                            className="discount-select"
                          >
                            <option value={0}>0% - Standard</option>
                            <option value={5}>5% - Bronze</option>
                            <option value={10}>10% - Silver</option>
                            <option value={15}>15% - Gold</option>
                            <option value={20}>20% - Platinum</option>
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
