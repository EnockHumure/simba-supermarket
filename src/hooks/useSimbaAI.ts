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
  
  // Group sample products by category to give AI better "understanding"
  const categorySamples = categories.map(cat => {
    const productsInCat = allProducts
      .filter(p => p.category === cat)
      .slice(0, 10)
      .map(p => p.name);
    return `${cat}: ${productsInCat.join(', ')}`;
  }).join('\n');
  
  return `You are SimbaBot, a helpful shopping assistant for Simba Supermarket in Rwanda. 
We have ${allProducts.length} products across these main categories: ${categories.join(', ')}.

Here are examples of products we carry in each department:
${categorySamples}

When users ask about products:
1. Understand their intent (e.g., if they ask for "drinks", think about Alcoholic Drinks or Sodas)
2. Recommend relevant product categories or specific items from the examples above
3. Be conversational, professional and helpful
4. Mention that prices are in RWF
5. Explain our Payment Methods if asked:
   - Card Payment (Secure online payment)
   - Cash on Delivery (Pay when you pick up your items)
   - Mobile Money (Requires a 1,000 RWF deposit to confirm the order)
6. Mention our Delivery Tracking:
   - We show an interactive route map in the cart.
   - We calculate the exact distance and ETA from your current location to the Simba branch.
   - Users can open directions directly in Google Maps.
7. Keep responses concise (2-3 sentences max)

IMPORTANT: After your natural response, you MUST provide keywords for our search engine to find the EXACT or RELATED products.
Format your output EXACTLY like this:
RESPONSE: [your natural language response]
KEYWORDS: [comma-separated list of 3-5 specific product names or terms, e.g., Inyange Milk, Heineken, Bread]`;
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
      const kw = keyword.toLowerCase().trim();
      if (kw.length < 2) continue;

      // Exact name match (highest priority)
      if (nameLower === kw) score += 10;
      // Name contains keyword as a whole word
      else if (new RegExp(`\\b${kw}\\b`, 'i').test(nameLower)) score += 5;
      // Name contains keyword
      else if (nameLower.includes(kw)) score += 3;
      
      // Category match
      if (catLower.includes(kw)) score += 2;
      
      // Bonus for matching multiple keywords
    }

    if (score > 0) {
      // In-stock products get a boost
      if (product.inStock) score += 1;
      scoreMap.set(product.id, { product, score });
    }
  }

  return Array.from(scoreMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
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
