import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  categoryCounts: Record<string, number>;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <p className="section-kicker">Departments</p>
        <h3>Shop by category</h3>
        <p>These filters drive the main product grid below.</p>
      </div>

      <div className="sidebar-list">
        <button
          className={`sidebar-item ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          <span>All Products</span>
          <strong>{Object.values(categoryCounts).reduce((total, count) => total + count, 0)}</strong>
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={`sidebar-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            <span>{category}</span>
            <strong>{categoryCounts[category] || 0}</strong>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
