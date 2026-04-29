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
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : ''}`} aria-label="Category Filters">
      <button 
        className="sidebar-toggle-btn" 
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className="toggle-content">
          <span className="toggle-icon">📂</span>
          <span className="toggle-text">Shop by category</span>
        </div>
        <span className={`arrow ${isExpanded ? 'up' : 'down'}`}>▼</span>
      </button>

      <div className={`sidebar-list ${isExpanded ? 'show' : ''}`}>
        <button
          className={`sidebar-item ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => {
            onSelectCategory(null);
            setIsExpanded(false);
          }}
          aria-pressed={selectedCategory === null}
          aria-label="Show all products"
        >
          <span>🏪 All Products</span>
          <strong>{Object.values(categoryCounts).reduce((total, count) => total + count, 0)}</strong>
        </button>

        {categories.map((category) => {
          const icons: Record<string, string> = {
            'Cosmetics & Personal Care': '💄',
            'Sports & Wellness': '🏆',
            'Baby Products': '👶',
            'Kitchenware & Electronics': '🔌',
            'Food Products': '🍎',
            'General': '📦',
            'Alcoholic Drinks': '🍷'
          };
          return (
            <button
              key={category}
              className={`sidebar-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => {
                onSelectCategory(category);
                setIsExpanded(false);
              }}
              aria-pressed={selectedCategory === category}
              aria-label={`Filter by ${translateCategoryLabel(category, language)}`}
            >
              <span>{icons[category] || '📁'} {translateCategoryLabel(category, language)}</span>
              <strong>{categoryCounts[category] || 0}</strong>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
