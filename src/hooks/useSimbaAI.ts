import { useState } from 'react';
import productsData from '../simba_products.json';
import type { Product } from '../context/CartContext';

interface AIResponse {
  text: string;
  matchedProducts: Product[];
}

const allProducts = productsData.products as Product[];

const STOP_WORDS = new Set([
  'can', 'buy', 'want', 'the', 'give', 'some', 'how', 'get', 'you',
  'have', 'does', 'what', 'are', 'for', 'and', 'with', 'find', 'show',
  'need', 'looking', 'please', 'where', 'any', 'there', 'that', 'this',
]);

const search = (input: string): Product[] => {
  const keywords = input
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));

  if (keywords.length === 0) return [];

  const scoreMap = new Map<number, { product: Product; score: number }>();

  for (const product of allProducts) {
    const nameLower = product.name.toLowerCase();
    const catLower = product.category.toLowerCase();
    let score = 0;

    for (const kw of keywords) {
      if (nameLower.includes(kw)) score += 2;
      else if (catLower.includes(kw)) score += 1;
    }

    if (score > 0) {
      scoreMap.set(product.id, { product, score });
    }
  }

  return Array.from(scoreMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((e) => e.product);
};

export const useSimbaAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getResponse = async (input: string): Promise<AIResponse> => {
    setIsLoading(true);

    const matched = search(input);

    const text = matched.length === 0
      ? `No products found for "${input}". Try a different term like "milk", "bread", or "coffee".`
      : matched.length === 1
      ? `Found 1 match for "${input}":`
      : `Found ${matched.length} products matching "${input}":`;

    setIsLoading(false);
    return { text, matchedProducts: matched };
  };

  return { getResponse, isLoading };
};
