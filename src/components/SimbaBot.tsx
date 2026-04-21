import React, { useEffect, useRef, useState } from 'react';
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
  const { getResponse, isLoading, isOnline } = useSimbaAI();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && messages.length === 0) {
      const welcomeText =
        activeDiscount > 0
          ? `Welcome back, ${user.name}. Your current Simba loyalty discount is ${activeDiscount}%. Ask for a product and I will surface matching items.`
          : `Hello ${user.name}. I am Simba Bot. Ask for any product in the Rwanda catalogue and I will help you find it quickly.`;

      setMessages([{ text: welcomeText, isBot: true }]);
    }
  }, [activeDiscount, messages.length, user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim() || isLoading) {
      return;
    }

    const userMessage = input.trim();
    setMessages((current) => [...current, { text: userMessage, isBot: false }]);
    setInput('');

    const aiResponse = await getResponse(userMessage, false, activeDiscount);
    setMessages((current) => [
      ...current,
      {
        text: aiResponse.text,
        isBot: true,
        productLinks: aiResponse.matchedProducts,
      },
    ]);
  };

  if (!user) {
    return null;
  }

  return (
    <div className={`simba-bot-container ${isOpen ? 'open' : ''}`}>
      {!isOpen && (
        <button 
          className="bot-trigger" 
          onClick={() => setIsOpen(true)}
          aria-label="Open Simba AI Assistant"
        >
          <span className="bot-icon">SB</span>
          <span className="bot-label">Ask Simba Bot</span>
        </button>
      )}

      {isOpen && (
        <div className="bot-window" role="dialog" aria-label="Simba AI Assistant">
          <div className="bot-header">
            <div className="header-info">
              <span className="bot-avatar">SB</span>
              <div>
                <h3>Simba Bot</h3>
                <p>
                  {isOnline === false ? (
                    <span className="status-offline">Offline Mode (Search Only)</span>
                  ) : (
                    "Find products and shortcuts"
                  )}
                </p>
              </div>
            </div>
            <button 
              className="close-bot" 
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
            >
              x
            </button>
          </div>

          <div className="bot-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`message-container ${message.isBot ? 'bot' : 'user'}`}>
                <div className={`message ${message.isBot ? 'bot' : 'user'}`}>{message.text}</div>
                {message.productLinks && message.productLinks.length > 0 && (
                  <div className="bot-product-links">
                    {message.productLinks.map((product) => (
                      <button
                        key={product.id}
                        className="bot-product-btn"
                        onClick={() => onViewProduct(product)}
                        aria-label={`View details for ${product.name}`}
                      >
                        View {product.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && <div className="message bot loading">Searching the Simba catalogue...</div>}
            <div ref={chatEndRef} />
          </div>

          <form className="bot-input" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask for milk, cassava, bread, juice..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isLoading}
              aria-label="Ask a question"
            />
            <button type="submit" disabled={isLoading} aria-label="Send message">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SimbaBot;
