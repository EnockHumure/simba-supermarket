import { useState } from 'react';
import productsData from '../simba_products.json';
import type { Product } from '../context/CartContext';

interface AIResponse {
  text: string;
  matchedProducts: Product[];
}

export const useSimbaAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  const askOllama = async (prompt: string): Promise<AIResponse | null> => {
    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama2',
          prompt: `You are Simba Bot, a helpful assistant for Simba Supermarket in Rwanda. 
          Context: We have products like Cassava, Massage Rollers, Electronics, etc. 
          User asked: "${prompt}"
          Response should be short, friendly, and helpful.`,
          stream: false
        })
      });

      if (!response.ok) {
        setIsOnline(false);
        return null;
      }
      const data = await response.json();
      setIsOnline(true);
      return { text: data.response, matchedProducts: [] };
    } catch (error) {
      setIsOnline(false);
      return null;
    }
  };

  const getResponse = async (input: string, _isLoyal: boolean, discount: number): Promise<AIResponse> => {
    setIsLoading(true);
    const lowerInput = input.toLowerCase();
    
    // 1. Try Local Ollama
    const ollamaResult = await askOllama(input);
    
    // 2. Fallback & Product Search
    const allProducts = productsData.products as Product[];
    
    // Improved product finding logic
    const commonStopWords = ['can', 'buy', 'want', 'i', 'the', 'give', 'me', 'some', 'is', 'a', 'do', 'you', 'have', 'how', 'to', 'get'];
    const keywords = lowerInput.split(/\W+/).filter(word => word.length >= 3 && !commonStopWords.includes(word));
    
    let matchedProducts: Product[] = [];
    for (const keyword of keywords) {
      const matches = allProducts.filter(p => p.name.toLowerCase().includes(keyword));
      matchedProducts = [...matchedProducts, ...matches];
    }
    
    // Deduplicate and prioritize
    matchedProducts = Array.from(new Map(matchedProducts.map(p => [p.id, p])).values()).slice(0, 3);

    let text = ollamaResult?.text || "";

    if (!text) {
      if (matchedProducts.length > 0) {
        text = `Sure! I found ${matchedProducts.length} items related to your request. Click the buttons below to see details:`;
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        text = "Hello! I'm Simba Bot. I can help you find fresh products, check discounts, or find store locations. What are you looking for today?";
      } else if (lowerInput.includes('buy')) {
        text = "I'd be happy to help you shop! What specific product are you looking for? You can search for anything from our fresh collection.";
      } else if (lowerInput.includes('discount') || lowerInput.includes('loyalty')) {
        text = discount > 0 
          ? `You're in luck! Our Admin has already granted you a ${discount}% discount. Your subtotal will update automatically!` 
          : "We value our loyal customers. Keep shopping with us using your phone number, and our Admin will grant you a special discount based on your purchases!";
      } else {
        const fallbackMsg = isOnline === false 
          ? "I'm currently running in offline mode, but I can still help you find products! " 
          : "That's a great request! ";
        text = fallbackMsg + "I'm still learning, but I can certainly help you find products if you tell me what you need (e.g., 'Cassava', 'Juice', 'Soap').";
      }
    }

    setIsLoading(false);
    return { text, matchedProducts };
  };

  return { getResponse, isLoading, isOnline };
};
