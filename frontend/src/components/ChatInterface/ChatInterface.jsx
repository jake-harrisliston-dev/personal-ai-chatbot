import React, { useState, useEffect, useRef } from "react";
import "./chat-interface.css"
import ChatCard from "../ChatCard/ChatCard"
import { api } from "../../services/api"
import ReactMarkdown from 'react-markdown'

export default function ChatInterface({ first_message, aiOpenModal }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasSentFirstMessage = useRef(false);
  const messageEndRef = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false)

  // Add footer to end of first response
  const hasSentDisclaimer = useRef(false)

  // Error handling
  const [error, setError] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);

  useEffect(() => {
    if (first_message && !hasSentFirstMessage.current) {
      hasSentFirstMessage.current = true
      handleSendMessage(first_message)
    }
  }, [first_message])

  const scrollToBottom = () => {
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
        const response = await api.aiGenerate({data: updatedMessages})
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        let buffer = ''

        while(true) {
          const {done, value} = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value, {stream: true})
          buffer += chunk;

          const parts = buffer.split('\n\n');
          buffer = parts.pop() || '';
          
          // const data = JSON.parse(chunk.replace("data: ", "").trim())

          for (const part of parts) {
            const trimmedMessage = part.trim()
            
            // Ignore empty lines or lines that don't look like our data
            if (!trimmedMessage || !trimmedMessage.startsWith('data: ')) continue

            try {
              const jsonStr = trimmedMessage.replace('data: ', '').trim()
              const data = JSON.parse(jsonStr)

              // Update UI based on message type
              if (data.type === "response") {
                setMessages(prev => {
                  const updated = [...prev]
                  updated[aiMessageIndex] = {
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

            } catch (parseError) {
              console.error("Error parsing stream chunk:", parseError, "Chunk was:", trimmedMessage)
            }
          }
        }

        setIsLoading(false);

        if (!hasSentDisclaimer.current) {

          hasSentDisclaimer.current = true

          setMessages(prev => {
            const appendFirstMessage = [...prev]
            appendFirstMessage[aiMessageIndex] ={
              ...appendFirstMessage[aiMessageIndex],
              content: appendFirstMessage[aiMessageIndex].content + 
                "\n\n---\n\n" +
                "\n\n*Please note: I'm an AI assistant providing general information only. " +
                "Do not share passwords, financial details, or confidential business information. " +
                "This is not professional advice - please verify all information independently. " +
                "For detailed consultations, I can help you book a meeting with Jake.*"
            }
            return appendFirstMessage
          })
        }
        return;
      } catch (error) {
        console.error('Error parsing AI response: ', error)

        if (error.status === 429) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Sorry, but our conversation has now exceeded it's maximum length. You can book a call with Jake to continue.",
            timestamp: new Date()
          }]);

          setTimeout(() => {
          aiOpenModal()
          }, 1000);
          return;
        }

        else {
          setMessages(prev => prev.slice(0, -1))
          setError(error.message || 'Something went wrong')
          setLastFailedMessage(message)
          setIsLoading(false)
          return;
        }
      }
    };
  
  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSendMessage(lastFailedMessage)
      setError(null)
    }
  }

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

            {error && (
              <div className="error-message">
                <span>Sorry, there has been an error</span>
                <button onClick={handleRetry} className="retry-button">
                  Retry
                </button>
              </div>
            )}

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