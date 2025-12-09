import React, { useState, useEffect, useRef } from "react";
import "./chat-interface.css"
import ChatCard from "../ChatCard/ChatCard"
import { api } from "../../services/api"
import ReactMarkdown from 'react-markdown'

export default function ChatInterface({ first_message, email }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasSentFirstMessage = useRef(false);

  useEffect(() => {
    if (first_message && !hasSentFirstMessage.current) {
      hasSentFirstMessage.current = true
      handleSendMessage(first_message)
    }
  }, [first_message])

  const handleSendMessage = async (message) => {
    const newUserMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    }
    
    const updatedMessages = [...messages, newUserMessage]
    setMessages(updatedMessages)
    

    const aiMessageIndex = updatedMessages.length
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "",
      timestamp: new Date()
    }]);
    
    setIsLoading(true)

    // Send message to API
    try {
        const response = await api.aiGenerate({data: updatedMessages, email: email})
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while(true) {
          const {done, value} = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, {stream: true})

          setMessages(prev => {
            const updated = [...prev]
            updated[aiMessageIndex] ={
              ...updated[aiMessageIndex],
              content: updated[aiMessageIndex].content + chunk
            }
            return updated
          })
        }

        setIsLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing AI response: ', error)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Error generating AI response: ' + error.message,
          timestamp: new Date()
        }]);
        setIsLoading(false);
        return;
      }

  };

  return (
    <div className="chat-interface-wrap">
      <div className="chat-section-wrap">
        <div className="chat-section">
            {messages.map((msg, index) => (
            <div key={index} className={`${msg.role === 'user' ? 'user-message' : 'ai-message'}`}>
              {msg.role === 'user' ? (
                msg.content
              ) : (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              )}
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