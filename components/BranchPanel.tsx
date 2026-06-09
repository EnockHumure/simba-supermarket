import React, { useState, useMemo } from 'react';
import { useUser, type UserProfile } from '../context/UserContext';
import { useCart, type OrderStatus } from '../context/CartContext';
import { useProductData } from '../context/ProductContext';
import { useSettings } from '../context/SettingsContext';
import { translations } from '../i18n';
import './BranchPanel.css';

interface BranchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type PanelMode = 'manager' | 'staff';
type BranchTab = 'orders' | 'staff' | 'inventory' | 'reviews';

// Mock staff data (in production, this would come from a database)
const STAFF_MEMBERS = [
  'John Mugisha',
  'Sarah Uwase',
  'David Nkunda',
  'Grace Mukamana',
  'Patrick Habimana',
];

const BranchPanel: React.FC<BranchPanelProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const { orders, updateOrderStatus, assignOrder, getReviewsForBranch, toggleFlagReview } = useCart();
  const { allProducts, getStockForBranch, updateBranchStock, getLowStockProducts } = useProductData();
  const { language } = useSettings();
  const t = translations[language];
  const [mode, setMode] = useState<PanelMode>('manager');
  const [activeTab, setActiveTab] = useState<BranchTab>('orders');
  const [selectedStaff, setSelectedStaff] = useState('John Mugisha');
  const [selectedBranch, setSelectedBranch] = useState('Union Trade Centre (City Center)');
  const [inventorySearch, setInventorySearch] = useState('');

  if (!isOpen || !user) {
    return null;
  }

  // Filter orders by selected branch
  const branchOrders = orders.filter(order => order.branchName === selectedBranch);

  // Filter orders by staff member (for staff view)
  const myOrders = branchOrders.filter(order => order.assignedTo === selectedStaff);

  // Pending orders (not assigned yet)
  const pendingOrders = branchOrders.filter(order => order.status === 'received');

  // Active orders (assigned but not picked up)
  const activeOrders = branchOrders.filter(order => 
    order.status !== 'received' && order.status !== 'picked_up' && order.status !== 'cancelled'
  );

  // Staff workload
  const staffWorkload = useMemo(() => {
    const workload: Record<string, number> = {};
    STAFF_MEMBERS.forEach(staff => {
      workload[staff] = branchOrders.filter(
        order => order.assignedTo === staff && order.status !== 'picked_up' && order.status !== 'cancelled'
      ).length;
    });
    return workload;
  }, [branchOrders]);

  // Get reviews for this branch
  const branchReviews = getReviewsForBranch(selectedBranch);
  const averageRating = branchReviews.length > 0
    ? branchReviews.reduce((sum, r) => sum + r.rating, 0) / branchReviews.length
    : 0;
  const flaggedReviews = branchReviews.filter(r => r.flagged);

  const filteredInventory = allProducts.filter(p =>
    p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    p.category.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  // Get low stock products for this branch
  const lowStockProducts = getLowStockProducts(selectedBranch, 10);
  const outOfStockCount = filteredInventory.filter(p => getStockForBranch(p.id, selectedBranch) === 0).length;

  const handleAssignOrder = (orderId: string, staffName: string) => {
    assignOrder(orderId, staffName);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'received': return '#2196f3';
      case 'assigned': return '#ff9800';
      case 'preparing': return '#9c27b0';
      case 'ready': return '#4caf50';
      case 'picked_up': return '#757575';
      case 'cancelled': return '#f44336';
      default: return '#757575';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'received': return '📥 Received';
      case 'assigned': return '👤 Assigned';
      case 'preparing': return '🔄 Preparing';
      case 'ready': return '✅ Ready';
      case 'picked_up': return '🎉 Picked Up';
      case 'cancelled': return '❌ Cancelled';
      default: return status;
    }
  };

  return (
    <div className="branch-overlay" onClick={onClose}>
      <div className="branch-modal" onClick={(e) => e.stopPropagation()}>
        <div className="branch-header">
          <div>
            <p className="section-kicker">Simba Branch Operations</p>
            <h2>{selectedBranch}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="branch-mode-toggle">
          <button
            className={`mode-btn ${mode === 'manager' ? 'active' : ''}`}
            onClick={() => setMode('manager')}
          >
            👔 Branch Manager
          </button>
          <button
            className={`mode-btn ${mode === 'staff' ? 'active' : ''}`}
            onClick={() => setMode('staff')}
          >
            👷 Branch Staff
          </button>
        </div>

        {mode === 'manager' && (
          <>
            <div className="branch-tabs">
              <button
                className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                📦 Orders ({pendingOrders.length + activeOrders.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'staff' ? 'active' : ''}`}
                onClick={() => setActiveTab('staff')}
              >
                👥 Staff ({STAFF_MEMBERS.length})
              </button>
              <button
                className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                onClick={() => setActiveTab('inventory')}
              >
                📋 Inventory
              </button>
              <button
                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                ⭐ Reviews ({branchReviews.length})
              </button>
            </div>

            <div className="branch-content">
              {activeTab === 'orders' && (
                <div className="branch-section">
                  <h3>Pending Orders ({pendingOrders.length})</h3>
                  <p className="branch-description">Assign these orders to staff members</p>

                  {pendingOrders.length === 0 ? (
                    <div className="empty-state">No pending orders</div>
                  ) : (
                    <div className="order-grid">
                      {pendingOrders.map(order => (
                        <div key={order.id} className="order-card pending">
                          <div className="order-card-header">
                            <div>
                              <strong>{order.id}</strong>
                              <span>{new Date(order.timestamp).toLocaleString()}</span>
                            </div>
                            <strong className="order-total">{order.total.toLocaleString()} RWF</strong>
                          </div>
                          <div className="order-customer">
                            <span>👤 {order.customerName}</span>
                            <span>📧 {order.customerEmail}</span>
                            {order.customerPhone && <span>📱 {order.customerPhone}</span>}
                            <span>⏰ Pick-up: {order.pickupTime}</span>
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
                            <label>Assign to:</label>
                            <select
                              onChange={(e) => handleAssignOrder(order.id, e.target.value)}
                              defaultValue=""
                            >
                              <option value="" disabled>Select staff member</option>
                              {STAFF_MEMBERS.map(staff => (
                                <option key={staff} value={staff}>
                                  {staff} ({staffWorkload[staff]} orders)
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <h3 style={{ marginTop: '32px' }}>Active Orders ({activeOrders.length})</h3>
                  <p className="branch-description">Orders currently being prepared</p>

                  {activeOrders.length === 0 ? (
                    <div className="empty-state">No active orders</div>
                  ) : (
                    <div className="order-grid">
                      {activeOrders.map(order => (
                        <div key={order.id} className="order-card active">
                          <div className="order-card-header">
                            <div>
                              <strong>{order.id}</strong>
                              <span>{new Date(order.timestamp).toLocaleString()}</span>
                            </div>
                            <span 
                              className="status-badge"
                              style={{ backgroundColor: getStatusColor(order.status) }}
                            >
                              {getStatusLabel(order.status)}
                            </span>
                          </div>
                          <div className="order-customer">
                            <span>👤 {order.customerName}</span>
                            <span>👷 Assigned to: {order.assignedTo}</span>
                            <span>⏰ Pick-up: {order.pickupTime}</span>
                          </div>
                          <div className="order-items">
                            {order.items.map(item => (
                              <div key={item.id} className="order-item">
                                <span>{item.quantity}x {item.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'staff' && (
                <div className="branch-section">
                  <h3>Staff Workload</h3>
                  <p className="branch-description">Current active orders per staff member</p>

                  <div className="staff-grid">
                    {STAFF_MEMBERS.map(staff => (
                      <div key={staff} className="staff-card">
                        <div className="staff-avatar">👤</div>
                        <div className="staff-info">
                          <strong>{staff}</strong>
                          <span>{staffWorkload[staff]} active orders</span>
                        </div>
                        <div className="staff-status">
                          {staffWorkload[staff] === 0 ? (
                            <span className="status-available">Available</span>
                          ) : staffWorkload[staff] <= 2 ? (
                            <span className="status-busy">Busy</span>
                          ) : (
                            <span className="status-overloaded">Overloaded</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'inventory' && (
                <div className="branch-section">
                  <div className="inventory-header">
                    <div>
                      <h3>Branch Inventory</h3>
                      <p className="branch-description">Manage stock levels for {selectedBranch}</p>
                    </div>
                    <div className="inventory-stats">
                      <div className="stat-badge warning">
                        <span>⚠️ {lowStockProducts.length}</span>
                        <small>Low Stock</small>
                      </div>
                      <div className="stat-badge danger">
                        <span>❌ {outOfStockCount}</span>
                        <small>Out of Stock</small>
                      </div>
                    </div>
                  </div>

                  {lowStockProducts.length > 0 && (
                    <div className="low-stock-alert">
                      <strong>⚠️ Low Stock Alert</strong>
                      <p>{lowStockProducts.length} products need restocking (≤10 units)</p>
                      <div className="low-stock-list">
                        {lowStockProducts.slice(0, 5).map(({ product, stock }) => (
                          <span key={product.id} className="low-stock-item">
                            {product.name}: {stock} units
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="admin-search-bar">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={inventorySearch}
                      onChange={(e) => setInventorySearch(e.target.value)}
                    />
                    <span className="search-count">{filteredInventory.length} products</span>
                  </div>

                  <div className="inventory-list">
                    {filteredInventory.slice(0, 50).map(product => {
                      const stock = getStockForBranch(product.id, selectedBranch);
                      const isLowStock = stock > 0 && stock <= 10;
                      const isOutOfStock = stock === 0;

                      return (
                        <div key={product.id} className={`inventory-item ${isOutOfStock ? 'out-of-stock' : isLowStock ? 'low-stock' : ''}`}>
                          <img src={product.image} alt={product.name} />
                          <div className="inventory-info">
                            <strong>{product.name}</strong>
                            <span>{product.category} • {product.price.toLocaleString()} RWF</span>
                          </div>
                          <div className="stock-controls">
                            <div className="stock-display">
                              <span className="stock-label">Stock:</span>
                              <input
                                type="number"
                                className="stock-input"
                                value={stock}
                                onChange={(e) => updateBranchStock(product.id, selectedBranch, parseInt(e.target.value) || 0)}
                                min="0"
                                max="999"
                              />
                              <span className="stock-unit">units</span>
                            </div>
                            {isOutOfStock && <span className="stock-badge out">Out of Stock</span>}
                            {isLowStock && <span className="stock-badge low">Low Stock</span>}
                            {stock > 10 && <span className="stock-badge ok">In Stock</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="branch-section">
                  <div className="reviews-header">
                    <div>
                      <h3>{t.branchReviews}</h3>
                      <p className="branch-description">{selectedBranch}</p>
                    </div>
                    <div className="reviews-stats">
                      <div className="rating-display">
                        <span className="rating-number">{averageRating.toFixed(1)}</span>
                        <div className="rating-stars">
                          {[1, 2, 3, 4, 5].map(star => (
                            <span key={star} className={star <= Math.round(averageRating) ? 'star-filled' : 'star-empty'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="rating-count">{branchReviews.length} {t.totalReviews}</span>
                      </div>
                    </div>
                  </div>

                  {flaggedReviews.length > 0 && (
                    <div className="flagged-reviews-alert">
                      <strong>🚩 {flaggedReviews.length} Flagged Reviews</strong>
                      <p>These reviews have been flagged for review by branch management</p>
                    </div>
                  )}

                  {branchReviews.length === 0 ? (
                    <div className="empty-state">{t.noReviews}</div>
                  ) : (
                    <div className="reviews-list">
                      {branchReviews.map(review => (
                        <div key={review.id} className={`review-card ${review.flagged ? 'flagged' : ''}`}>
                          <div className="review-header">
                            <div className="review-customer">
                              <strong>{review.customerName}</strong>
                              <span>{new Date(review.timestamp).toLocaleDateString()}</span>
                            </div>
                            <div className="review-rating">
                              {[1, 2, 3, 4, 5].map(star => (
                                <span key={star} className={star <= review.rating ? 'star-filled' : 'star-empty'}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="review-comment">{review.comment}</p>
                          <div className="review-actions">
                            <button
                              className={`flag-btn ${review.flagged ? 'flagged' : ''}`}
                              onClick={() => toggleFlagReview(review.id)}
                            >
                              {review.flagged ? `🚩 ${t.flagged}` : `🏳️ ${t.flagReview}`}
                            </button>
                            {review.flagged && (
                              <button
                                className="unflag-btn"
                                onClick={() => toggleFlagReview(review.id)}
                              >
                                {t.unflag}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {mode === 'staff' && (
          <>
            <div className="staff-selector">
              <label>Logged in as:</label>
              <select value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)}>
                {STAFF_MEMBERS.map(staff => (
                  <option key={staff} value={staff}>{staff}</option>
                ))}
              </select>
            </div>

            <div className="branch-content">
              <div className="branch-section">
                <h3>My Orders ({myOrders.length})</h3>
                <p className="branch-description">Orders assigned to you</p>

                {myOrders.length === 0 ? (
                  <div className="empty-state">No orders assigned to you yet</div>
                ) : (
                  <div className="order-grid">
                    {myOrders.map(order => (
                      <div key={order.id} className="order-card staff">
                        <div className="order-card-header">
                          <div>
                            <strong>{order.id}</strong>
                            <span>{new Date(order.timestamp).toLocaleString()}</span>
                          </div>
                          <strong className="order-total">{order.total.toLocaleString()} RWF</strong>
                        </div>
                        <div className="order-customer">
                          <span>👤 {order.customerName}</span>
                          <span>📧 {order.customerEmail}</span>
                          {order.customerPhone && <span>📱 {order.customerPhone}</span>}
                          <span>⏰ Pick-up: {order.pickupTime}</span>
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
                            <option value="assigned">👤 Assigned</option>
                            <option value="preparing">🔄 Preparing</option>
                            <option value="ready">✅ Ready for Pick-up</option>
                            <option value="picked_up">🎉 Picked Up</option>
                            <option value="cancelled">❌ Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BranchPanel;
