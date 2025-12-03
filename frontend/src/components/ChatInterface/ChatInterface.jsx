import React, { useState } from "react";
import "./chat-interface.css"
import ChatCard from "../ChatCard/ChatCard"

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = (message) => {
    setMessages(prev => [...prev, {
      role: 'user',
      content: message,
      timestamp: new Date()
    }]);
    
    // TODO: Send to API and get AI response
    console.log('Sending message:', message);
  };

  return (
    <div className="chat-interface-wrap">
      <div className="chat-section-wrap">
        <div className="chat-section">
            {messages.map((msg, index) => (
            <div key={index} className="usr-message">
                {msg.content}
            </div>
            ))}
        </div>
      </div>

      <div className="prompt-wrap">
        <ChatCard 
          placeholder="Describe your business..."
          onSendMessage={handleSendMessage}
        />
        <p className="prompt-subtext">
          Artificial Intelligence can make mistakes. Check responses for accuracy.
        </p>
      </div>
    </div>
  );
}