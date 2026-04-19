import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <aside className="sidebar">
      <h3>Categories</h3>
      <ul>
        <li
          className={selectedCategory === null ? 'active' : ''}
          onClick={() => onSelectCategory(null)}
        >
          All Products
        </li>
        {categories.map((category) => (
          <li
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
