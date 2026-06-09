import React from 'react';
import RecipeCard, { type Recipe } from './RecipeCard';
import recipesData from '../recipes.json';

const RecipesSection: React.FC = () => {
  const recipes = recipesData as Recipe[];

  return (
    <section className="mt-12 mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-simba-orange">Meal Solutions</span>
          <h2 className="text-3xl font-black text-simba-ink mt-1">Shop by Recipe</h2>
          <p className="text-sm text-simba-muted">Inspiration for your next Kigali feast. One click adds all ingredients.</p>
        </div>
        <button className="hidden md:block bg-simba-bg border border-simba-line px-6 py-2 rounded-xl text-xs font-black text-simba-ink hover:border-simba-primary transition-colors">
          Browse All Recipes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        
        {/* Featured Meal Card (Placeholder for visual variety) */}
        <div className="hidden lg:flex flex-col justify-center p-10 bg-gradient-to-br from-simba-secondary/20 to-simba-orange/20 rounded-[32px] border-2 border-dashed border-simba-orange/30">
          <span className="text-4xl mb-4">👨‍🍳</span>
          <h3 className="text-xl font-black text-simba-ink mb-2">New Recipes Weekly</h3>
          <p className="text-sm text-simba-muted leading-relaxed">
            Check back every Monday for new Rwandan and international meal ideas from Simba's top chefs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
