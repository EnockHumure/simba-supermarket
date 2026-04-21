import React, { useEffect, useRef, useState } from 'react';
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
  const { getResponse, isLoading } = useSimbaAI();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ text: "Hi! Type any product name and I'll find it for you.", isBot: true }]);
    }
  }, [messages.length]);

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

    const aiResponse = await getResponse(userMessage);
    setMessages((current) => [
      ...current,
      {
        text: aiResponse.text,
        isBot: true,
        productLinks: aiResponse.matchedProducts,
      },
    ]);


  };

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
                <p>Product finder</p>
              </div>
            </div>
            <button 
              className="close-bot" 
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
            >
              ✕
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
                        <span>{product.name}</span>
                        <strong>{product.price.toLocaleString()} RWF</strong>
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
              placeholder="Search: milk, bread, coffee..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isLoading}
              aria-label="Search for a product"
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
