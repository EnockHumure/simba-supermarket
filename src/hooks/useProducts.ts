import { useMemo, useState } from 'react';
import productsData from '../simba_products.json';
import type { Product } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { translateCategoryLabel, translateProductLabel } from '../i18n';

export const useProducts = () => {
  const { language } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allProducts = productsData.products as Product[];

  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((product) => product.category)));
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
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
  }, [allProducts, language, searchTerm, selectedCategory]);

  return {
    products: filteredProducts,
    allProducts,
    categories,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  };
};
