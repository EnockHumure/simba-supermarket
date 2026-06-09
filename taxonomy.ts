// Simba Supermarket - Deep Taxonomy (Wegmans-style)
// Re-engineered for rich categorization and discovery

export interface TaxonomyNode {
  id: string;
  name: string;
  icon?: string;
  description?: string;
}

export interface Category extends TaxonomyNode {
  departmentId: string;
  parentId?: string;
}

// Wegmans-style Departments
export const departments: TaxonomyNode[] = [
  { id: 'fresh-produce', name: 'Fresh Produce', icon: '🍎', description: 'Fruits and vegetables' },
  { id: 'meat-seafood', name: 'Meat & Seafood', icon: '🥩', description: 'Fresh meats and ocean picks' },
  { id: 'dairy-eggs', name: 'Dairy & Eggs', icon: '🥛', description: 'Milk, cheese, yogurt, eggs' },
  { id: 'bakery', name: 'Bakery', icon: '🥐', description: 'Fresh bread & pastries' },
  { id: 'pantry', name: 'Pantry', icon: '🥫', description: 'Essential pantry items' },
  { id: 'frozen-foods', name: 'Frozen Foods', icon: '🧊', description: 'Quick and frozen meals' },
  { id: 'beverages', name: 'Beverages', icon: '🥤', description: 'Drinks & refreshments' },
  { id: 'alcoholic-drinks', name: 'Alcoholic Drinks', icon: '🍷', description: 'Beer, wine, and spirits' },
  { id: 'baby-kids', name: 'Baby & Kids', icon: '👶', description: 'Essentials for the little ones' },
  { id: 'health-beauty', name: 'Health & Beauty', icon: '💄', description: 'Wellness and personal care' },
  { id: 'household', name: 'Household', icon: '🏠', description: 'Cleaning & home essentials' },
  { id: 'electronics', name: 'Electronics & Appliances', icon: '🔌', description: 'Gadgets and appliances' },
];

// Categories within each department
export const categories: Category[] = [
  // Fresh Produce
  { id: 'fruits', name: 'Fruits', departmentId: 'fresh-produce' },
  { id: 'vegetables', name: 'Vegetables', departmentId: 'fresh-produce' },
  
  // Meat & Seafood
  { id: 'beef', name: 'Beef', departmentId: 'meat-seafood' },
  { id: 'chicken', name: 'Chicken', departmentId: 'meat-seafood' },
  { id: 'fish', name: 'Fish', departmentId: 'meat-seafood' },
  
  // Dairy & Eggs
  { id: 'milk', name: 'Milk', departmentId: 'dairy-eggs' },
  { id: 'cheese', name: 'Cheese', departmentId: 'dairy-eggs' },
  { id: 'yogurt', name: 'Yogurt', departmentId: 'dairy-eggs' },
  { id: 'eggs', name: 'Eggs', departmentId: 'dairy-eggs' },
  
  // Bakery
  { id: 'bread', name: 'Bread', departmentId: 'bakery' },
  { id: 'pastries', name: 'Pastries', departmentId: 'bakery' },
  { id: 'cakes', name: 'Cakes', departmentId: 'bakery' },
  
  // Pantry
  { id: 'grains-rice', name: 'Grains & Rice', departmentId: 'pantry' },
  { id: 'cooking-oils', name: 'Cooking Oils', departmentId: 'pantry' },
  { id: 'spices', name: 'Spices & Seasoning', departmentId: 'pantry' },
  { id: 'pasta', name: 'Pasta & Noodles', departmentId: 'pantry' },
  
  // Beverages
  { id: 'water', name: 'Water', departmentId: 'beverages' },
  { id: 'soft-drinks', name: 'Soft Drinks', departmentId: 'beverages' },
  { id: 'juices', name: 'Juices', departmentId: 'beverages' },
  { id: 'coffee-tea', name: 'Coffee & Tea', departmentId: 'beverages' },
  
  // Health & Beauty
  { id: 'skincare', name: 'Skincare', departmentId: 'health-beauty' },
  { id: 'haircare', name: 'Haircare', departmentId: 'health-beauty' },
  { id: 'personal-hygiene', name: 'Personal Hygiene', departmentId: 'health-beauty' },
  
  // Household
  { id: 'cleaning-supplies', name: 'Cleaning Supplies', departmentId: 'household' },
  { id: 'kitchenware', name: 'Kitchenware', departmentId: 'household' },
  { id: 'laundry-care', name: 'Laundry Care', departmentId: 'household' },
  
  // Electronics
  { id: 'home-appliances', name: 'Home Appliances', departmentId: 'electronics' },
  { id: 'gadgets', name: 'Gadgets', departmentId: 'electronics' },
];

// Simple sub-categories (Optional for now)
export const subCategories: Category[] = [
  { id: 'whole-milk', name: 'Whole Milk', departmentId: 'dairy-eggs', parentId: 'milk' },
  { id: 'low-fat-milk', name: 'Low Fat Milk', departmentId: 'dairy-eggs', parentId: 'milk' },
];

// Helper functions
export const getCategoriesByDepartment = (departmentId: string): Category[] => {
  return categories.filter(cat => cat.departmentId === departmentId);
};

export const getDepartmentById = (departmentId: string): TaxonomyNode | undefined => {
  return departments.find(d => d.id === departmentId);
};

export const getAllCategories = (): Category[] => {
  return categories;
};

export const getNavigationDepartments = (): TaxonomyNode[] => {
  return departments;
};
