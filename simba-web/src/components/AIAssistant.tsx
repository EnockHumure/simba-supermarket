import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import './AIAssistant.css';

interface AIAssistantProps {
  selectedCategory: string | null;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ selectedCategory }) => {
  const { user, isLoyal } = useUser();
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!user) return;

    let msg = `Hi ${user.name}! How can I help you today?`;
    
    if (isLoyal) {
      msg = `Welcome back, ${user.name}! I've applied your 5% loyal customer discount to the cart.`;
    }

    if (selectedCategory) {
      msg = `Great choice! Our ${selectedCategory} section has some amazing fresh arrivals today.`;
    }

    setMessage(msg);
    setIsVisible(true);
    
    const timer = setTimeout(() => setIsVisible(false), 8000);
    return () => clearTimeout(timer);
  }, [user, isLoyal, selectedCategory]);

  if (!user) return null;

  return (
    <div className={`ai-assistant-container ${isVisible ? 'visible' : ''}`}>
      <div className="ai-bubble">
        {message}
      </div>
      <div className="ai-avatar" onClick={() => setIsVisible(!isVisible)}>
        <span className="ai-icon">🤖</span>
      </div>
    </div>
  );
};

export default AIAssistant;
