import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useSimbaAI } from '../hooks/useSimbaAI';
import type { Product } from '../context/CartContext';
import './SimbaBot.css';

interface Message {
  text: string;
  isBot: boolean;
  productLinks?: Product[];
}

interface SimbaBotProps {
  onViewProduct: (product: Product) => void;
}

const SimbaBot: React.FC<SimbaBotProps> = ({ onViewProduct }) => {
  const { user, activeDiscount } = useUser();
  const { getResponse, isLoading } = useSimbaAI();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && messages.length === 0) {
      let welcomeMsg = `Hello ${user.name}! 🦁 I am your Simba Shopping Assistant. I can help you find any product in our store and redirect you to it instantly! Just tell me what you're looking for (e.g., 'Cassava', 'Juice', or 'Massage Roller') and I'll fetch it for you.`;
      
      if (activeDiscount > 0) {
        welcomeMsg = `Welcome back, ${user.name}! 🦁 Our Admin has granted you a ${activeDiscount}% loyalty discount! I can also help you find and redirect you to any product—just tell me what you need!`;
      }
      setMessages([{ text: welcomeMsg, isBot: true }]);
    }
  }, [user, activeDiscount, messages.length]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput('');

    const aiResponse = await getResponse(userMsg, false, activeDiscount);
    
    setMessages(prev => [...prev, { 
      text: aiResponse.text, 
      isBot: true, 
      productLinks: aiResponse.matchedProducts 
    }]);
  };

  if (!user) return null;

  return (
    <div className={`simba-bot-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <div className="bot-trigger" onClick={() => setIsOpen(true)}>
          <span className="bot-icon">🦁</span>
          <span className="bot-label">Ask Simba Bot</span>
        </div>
      )}

      {isOpen && (
        <div className="bot-window">
          <div className="bot-header">
            <div className="header-info">
              <span className="bot-avatar">🦁</span>
              <h3>Simba Bot</h3>
            </div>
            <button className="close-bot" onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          <div className="bot-messages">
            {messages.map((m, i) => (
              <div key={i} className={`message-container ${m.isBot ? 'bot' : 'user'}`}>
                <div className={`message ${m.isBot ? 'bot' : 'user'}`}>
                  {m.text}
                </div>
                {m.productLinks && m.productLinks.length > 0 && (
                  <div className="bot-product-links">
                    <p className="bot-hint">Click below to view the product:</p>
                    {m.productLinks.map(p => (
                      <button 
                        key={p.id} 
                        className="bot-product-btn"
                        onClick={() => onViewProduct(p)}
                      >
                        📦 View {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && <div className="message bot loading">Simba Bot is fetching products...</div>}
            <div ref={chatEndRef} />
          </div>
          <form className="bot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="What can I find for you?" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? '...' : 'Fetch'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SimbaBot;
