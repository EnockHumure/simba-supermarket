import React from 'react';
import { useCart } from '../context/CartContext';
import { useProductData } from '../context/ProductContext';
import './RecipeCard.css';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  servings: number;
  prepTime: string;
  ingredients: Array<{ productId: number; name: string; quantity: number }>;
}

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { addToCart } = useCart();
  const { allProducts } = useProductData();

  const handleAddAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    let addedCount = 0;
    
    recipe.ingredients.forEach(ingredient => {
      const product = allProducts.find(p => p.id === ingredient.productId);
      if (product && product.inStock) {
        for (let i = 0; i < ingredient.quantity; i++) {
          addToCart(product);
        }
        addedCount++;
      }
    });

    if (addedCount > 0) {
      alert(`Added ingredients for "${recipe.name}" to your cart!`);
    } else {
      alert("Sorry, ingredients for this recipe are currently out of stock.");
    }
  };

  return (
    <div className="recipe-card group">
      <div className="recipe-image-wrapper">
        <img src={recipe.image} alt={recipe.name} className="recipe-image" />
        <div className="recipe-overlay">
          <button className="add-recipe-btn" onClick={handleAddAll}>
            Add all to cart
          </button>
        </div>
        <div className="recipe-meta-tags">
          <span className="recipe-tag">{recipe.prepTime}</span>
          <span className="recipe-tag">{recipe.servings} Servings</span>
        </div>
      </div>
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.name}</h3>
        <p className="recipe-desc">{recipe.description}</p>
        <div className="recipe-ingredients-preview">
          {recipe.ingredients.map((ing, idx) => (
            <span key={idx} className="ing-dot" title={ing.name}></span>
          ))}
          <span className="text-[10px] text-simba-muted font-bold ml-1">
            {recipe.ingredients.length} ingredients
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
