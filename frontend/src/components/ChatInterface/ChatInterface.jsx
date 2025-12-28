import React, { useState, useEffect, useRef } from "react";
import "./chat-interface.css"
import ChatCard from "../ChatCard/ChatCard"
import { api } from "../../services/api"
import ReactMarkdown from 'react-markdown'

export default function ChatInterface({ first_message, email, aiOpenModal }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasSentFirstMessage = useRef(false);
  const messageEndRef = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)

  useEffect(() => {
    if (first_message && !hasSentFirstMessage.current) {
      hasSentFirstMessage.current = true
      handleSendMessage(first_message)
    }
  }, [first_message])

  const scrollToBottom = () => {
    console.log("Scroll to bottom function called")
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

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
    
    setShouldScrollToBottom(true)
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

          const data = JSON.parse(chunk.replace("data: ", "").trim())

          if (data.type === "response") {
            setMessages(prev => {
              const updated = [...prev]
              updated[aiMessageIndex] ={
                ...updated[aiMessageIndex],
                content: updated[aiMessageIndex].content + data.content
              }
              return updated
            })
          }
          else if (data.type === "tool_use") {
            setTimeout(() => {
              aiOpenModal()
            }, 750)
          }
        }

        setIsLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing AI response: ', error)

        if (error.status === 429) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Sorry, but our conversation has now exceeded it's maximum length. You can book a call with Jake to continue.",
            timestamp: new Date()
          }]);

          console.log('caught it')
          setTimeout(() => {
          aiOpenModal()
          }, 1000);
          return;
        }

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Error generating AI response: ' + error.message,
          timestamp: new Date()
        }]);
        setIsLoading(false);
        return;
      }

  };

  useEffect(() => {
    if (shouldScrollToBottom) {
      scrollToBottom();
      setShouldScrollToBottom(false)
    }
  }, [messages, shouldScrollToBottom]);

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
            <div ref={messageEndRef} className="gradient-orb"></div>
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