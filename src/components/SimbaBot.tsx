import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import './SimbaBot.css';

interface Message {
  text: string;
  isBot: boolean;
}

const SimbaBot: React.FC = () => {
  const { user, isLoyal } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user && messages.length === 0) {
      const welcomeMsg = isLoyal 
        ? `Welcome back, ${user.name}! 🦁 How can I assist you with your loyal customer benefits today?`
        : `Hello ${user.name}! I'm Simba Bot, your personal shopping guide. Ask me anything about our store!`;
      setMessages([{ text: welcomeMsg, isBot: true }]);
    }
  }, [user, isLoyal]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput('');

    // Simulated Bot Responses
    setTimeout(() => {
      let botResponse = "That's a great question! I'm here to help you find the best deals at Simba Supermarket.";
      
      const lowerInput = userMsg.toLowerCase();
      if (lowerInput.includes('location') || lowerInput.includes('where')) {
        botResponse = "We are located in Kigali, Rwanda! You can find us in several convenient spots around the city.";
      } else if (lowerInput.includes('discount') || lowerInput.includes('loyalty')) {
        botResponse = isLoyal 
          ? "You're one of our loyal customers! You get an automatic 5% discount on every order today."
          : "Shopping with us more than once makes you a loyal customer, unlocking a 5% discount on all future orders!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = `Hi ${user?.name}! Hope you're having a wonderful day shopping with us!`;
      } else if (lowerInput.includes('category') || lowerInput.includes('fresh')) {
        botResponse = "We have everything from fresh produce to electronics. Check out our 'Cosmetics' or 'Sports' sections for some great deals!";
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
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
              <div key={i} className={`message ${m.isBot ? 'bot' : 'user'}`}>
                {m.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form className="bot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SimbaBot;
