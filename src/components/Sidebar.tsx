import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { translateCategoryLabel } from '../i18n';

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
    <aside className="w-full lg:w-72 flex-shrink-0">
      <button 
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white border border-simba-line rounded-xl mb-4" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">📂</span>
          <span className="text-sm font-black text-simba-ink">Shop by category</span>
        </div>
        <span className={`text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      <div className={`flex flex-col gap-1.5 lg:flex transition-all ${isExpanded ? 'flex' : 'hidden'}`}>
        <button
          className={`group w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${selectedCategory === null ? 'bg-simba-primary border-simba-primary text-white shadow-lg shadow-simba-primary/20' : 'bg-white border-simba-line hover:border-simba-primary text-simba-ink'}`}
          onClick={() => {
            onSelectCategory(null);
            setIsExpanded(false);
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl group-hover:scale-110 transition-transform">🏪</span>
            <span className="text-[13px] font-bold">All Products</span>
          </div>
          <strong className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === null ? 'bg-white/20 text-white' : 'bg-simba-bg text-simba-muted'}`}>
            {Object.values(categoryCounts).reduce((total, count) => total + count, 0)}
          </strong>
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
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              className={`group w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${isActive ? 'bg-simba-primary border-simba-primary text-white shadow-lg shadow-simba-primary/20' : 'bg-white border-simba-line hover:border-simba-primary text-simba-ink'}`}
              onClick={() => {
                onSelectCategory(category);
                setIsExpanded(false);
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl group-hover:scale-110 transition-transform">{icons[category] || '📁'}</span>
                <span className="text-[13px] font-bold text-left">{translateCategoryLabel(category, language)}</span>
              </div>
              <strong className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-simba-bg text-simba-muted'}`}>
                {categoryCounts[category] || 0}
              </strong>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
