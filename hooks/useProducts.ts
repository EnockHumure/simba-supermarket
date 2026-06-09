import { useMemo, useState } from 'react';
import { useProductData } from '../context/ProductContext';
import { useSettings } from '../context/SettingsContext';
import { translateCategoryLabel, translateProductLabel } from '../i18n';

export const useProducts = (allowedCategories?: string[]) => {
  const { language } = useSettings();
  const { allProducts } = useProductData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredByService = useMemo(() => {
    if (!allowedCategories || allowedCategories.length === 0) return allProducts;
    return allProducts.filter(p => allowedCategories.includes(p.category));
  }, [allProducts, allowedCategories]);

  const categories = useMemo(() => {
    return Array.from(new Set(filteredByService.map((product) => product.category)));
  }, [filteredByService]);

  const filteredProducts = useMemo(() => {
    return filteredByService.filter((product) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        term.length === 0 ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        translateProductLabel(product.name, language).toLowerCase().includes(term) ||
        translateCategoryLabel(product.category, language).toLowerCase().includes(term);
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [filteredByService, language, searchTerm, selectedCategory]);

  return {
    products: filteredProducts.filter(p => p.inStock),
    allProducts: filteredByService,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
};
