import React, { useState } from "react";
import "./chat-interface.css"
import ChatCard from "../ChatCard/ChatCard"
import { api } from "../../services/api"

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message) => {
    setMessages(prev => [...prev, {
      role: 'user',
      content: message,
      timestamp: new Date()
    }]);
    setIsLoading(true);

    console.log("Message to be sent via API: ", message)
    try {
        const response = await api.aiGenerate({
            data: message,
          });
    } catch (error) {
        console.error('=== Chat Message Error ===');
        console.error('Chat error details:', error);
    }

    setIsLoading(false)
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