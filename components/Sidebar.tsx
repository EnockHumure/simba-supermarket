import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { translateCategoryLabel, departments, categories, subCategories } from '../taxonomy';

interface SidebarProps {
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  departmentCounts: Record<string, number>;
  categoryCounts: Record<string, number>;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategoryId,
  onSelectCategory,
  departmentCounts,
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
          className={`group w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${selectedCategoryId === null ? 'bg-simba-primary border-simba-primary text-white shadow-lg shadow-simba-primary/20' : 'bg-white border-simba-line hover:border-simba-primary text-simba-ink'}`}
          onClick={() => {
            onSelectCategory(null);
            setIsExpanded(false);
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl group-hover:scale-110 transition-transform">🏪</span>
            <span className="text-[13px] font-bold">All Products</span>
          </div>
          <strong className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategoryId === null ? 'bg-white/20 text-white' : 'bg-simba-bg text-simba-muted'}`}>
            {Object.values(departmentCounts).reduce((total, count) => total + count, 0)}
          </strong>
        </button>

        <div className="mt-4 flex flex-col gap-2">
          <h3 className="px-4 py-2 text-xs font-black uppercase tracking-wider text-simba-muted border-b border-simba-line mb-2">Departments</h3>
          {departments.map((dept) => {
            const isDeptActive = selectedCategoryId === dept.id;
            const deptCount = departmentCounts[dept.id] || 0;
            const deptCategories = getCategoriesByDepartment(dept.id);
            
            return (
              <div key={dept.id} className="flex flex-col gap-1">
                <button
                  className={`group w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${isDeptActive ? 'bg-simba-primary border-simba-primary text-white shadow-lg shadow-simba-primary/20' : 'bg-white border-simba-line hover:border-simba-primary text-simba-ink'}`}
                  onClick={() => {
                    onSelectCategory(dept.id);
                    setIsExpanded(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl group-hover:scale-110 transition-transform">{dept.icon}</span>
                    <span className="text-[13px] font-bold">{translateCategoryLabel(dept.name, language)}</span>
                  </div>
                  <strong className={`text-[10px] px-2 py-0.5 rounded-full ${isDeptActive ? 'bg-white/20 text-white' : 'bg-simba-bg text-simba-muted'}`}>
                    {deptCount}
                  </strong>
                </button>
                
                {/* Categories within this department */}
                {isDeptActive && deptCategories.length > 0 && (
                  <div className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-simba-line/30 pl-3 py-1 animate-in fade-in slide-in-from-left-2 duration-300">
                    {deptCategories.map((cat) => {
                      const catCount = categoryCounts[cat.id] || 0;
                      // We'll use a secondary filter state for categories later, but for now we just show them
                      return (
                        <button
                          key={cat.id}
                          className="w-full flex items-center justify-between p-2 rounded-xl transition-all text-left text-simba-muted hover:bg-simba-bg hover:text-simba-primary group"
                          onClick={() => {
                            // For now, selecting a category just selects the department and logs
                            console.log('Selected Category:', cat.id);
                          }}
                        >
                          <span className="text-[11px] font-medium group-hover:translate-x-1 transition-transform">{translateCategoryLabel(cat.name, language)}</span>
                          <span className="text-[9px] font-bold opacity-60">{catCount}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
