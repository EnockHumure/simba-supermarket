import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { translateCategoryLabel } from '../i18n';
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
  const { language } = useSettings();

  return (
    <aside className="sidebar" aria-label="Category Filters">
      <div className="sidebar-header">
        <p className="section-kicker">Departments</p>
        <h3>Shop by category</h3>
        <p>These filters drive the main product grid below.</p>
      </div>

      <div className="sidebar-list">
        <button
          className={`sidebar-item ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
          aria-pressed={selectedCategory === null}
          aria-label="Show all products"
        >
          <span>All Products</span>
          <strong>{Object.values(categoryCounts).reduce((total, count) => total + count, 0)}</strong>
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={`sidebar-item ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
            aria-pressed={selectedCategory === category}
            aria-label={`Filter by ${translateCategoryLabel(category, language)}`}
          >
            <span>{translateCategoryLabel(category, language)}</span>
            <strong>{categoryCounts[category] || 0}</strong>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
