import { useState } from 'react';
import productsData from '../simba_products.json';
import type { Product } from '../context/CartContext';

interface AIResponse {
  text: string;
  matchedProducts: Product[];
}

const allProducts = productsData.products as Product[];
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Fallback keyword search for when Groq is unavailable
const STOP_WORDS = new Set([
  'can', 'buy', 'want', 'the', 'give', 'some', 'how', 'get', 'you',
  'have', 'does', 'what', 'are', 'for', 'and', 'with', 'find', 'show',
  'need', 'looking', 'please', 'where', 'any', 'there', 'that', 'this',
]);

const keywordSearch = (input: string): Product[] => {
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

// Build product catalog summary for Groq context
const buildProductContext = (): string => {
  const categories = Array.from(new Set(allProducts.map(p => p.category)));
  const sampleProducts = allProducts.slice(0, 50).map(p => 
    `${p.name} (${p.price} RWF, ${p.category})`
  ).join(', ');
  
  return `You are SimbaBot, a helpful shopping assistant for Simba Supermarket in Rwanda. 
We have ${allProducts.length} products across these categories: ${categories.join(', ')}.
Sample products: ${sampleProducts}...

When users ask about products:
1. Understand their intent (breakfast, cleaning, cooking, etc.)
2. Recommend relevant product categories or specific items
3. Be conversational and helpful
4. Mention prices in RWF when relevant
5. Keep responses concise (2-3 sentences max)

IMPORTANT: Extract product keywords from your response and return them in this format:
RESPONSE: [your natural language response]
KEYWORDS: [comma-separated keywords to search, e.g., milk, bread, eggs]`;
};

// Call Groq API for conversational understanding
const callGroqAPI = async (userMessage: string): Promise<{ response: string; keywords: string[] }> => {
  if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
    throw new Error('Groq API key not configured');
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: buildProductContext(),
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || '';

    // Parse response and keywords
    const responsePart = aiMessage.split('KEYWORDS:')[0].replace('RESPONSE:', '').trim();
    const keywordsPart = aiMessage.split('KEYWORDS:')[1]?.trim() || '';
    const keywords = keywordsPart
      .split(',')
      .map((k: string) => k.trim().toLowerCase())
      .filter((k: string) => k.length > 0);

    return {
      response: responsePart || aiMessage,
      keywords: keywords.length > 0 ? keywords : [userMessage],
    };
  } catch (error) {
    console.error('Groq API error:', error);
    throw error;
  }
};

// Smart search using AI-extracted keywords
const smartSearch = (keywords: string[]): Product[] => {
  const scoreMap = new Map<number, { product: Product; score: number }>();

  for (const product of allProducts) {
    const nameLower = product.name.toLowerCase();
    const catLower = product.category.toLowerCase();
    let score = 0;

    for (const keyword of keywords) {
      const kw = keyword.toLowerCase();
      if (nameLower.includes(kw)) score += 3;
      else if (catLower.includes(kw)) score += 2;
      // Partial match
      else if (nameLower.split(' ').some(word => word.startsWith(kw))) score += 1;
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

    try {
      // Try Groq API first for conversational understanding
      const { response, keywords } = await callGroqAPI(input);
      const matched = smartSearch(keywords);

      setIsLoading(false);
      return {
        text: response,
        matchedProducts: matched,
      };
    } catch (error) {
      // Fallback to keyword search if Groq fails
      console.warn('Falling back to keyword search:', error);
      const matched = keywordSearch(input);

      const text = matched.length === 0
        ? `I couldn't find products for "${input}". Try searching for specific items like "milk", "bread", or "coffee".`
        : matched.length === 1
        ? `I found this product for you:`
        : `Here are ${matched.length} products I found:`;

      setIsLoading(false);
      return { text, matchedProducts: matched };
    }
  };

  return { getResponse, isLoading };
};
