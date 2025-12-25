import { useState, useRef, useEffect } from 'react'
import Icon from '../Icon/Icon'
import "./chat-card.css"

export default function ChatCard({ onSendMessage, onMessageChange, placeholder, autoMessage }) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [message])

  // Change message value when preset pressed in LandingTitle
  useEffect(() => {
    setMessage(autoMessage)
  }, [autoMessage])

  // Notify LandingTitle when the message contents changes
  useEffect(() => {
    if (onMessageChange) {
      onMessageChange(message);
    }
  }, [message, onMessageChange])

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage('') // Clear after sending
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }
  const handleKeyDown = (e) => {
    // Send on Enter, but allow Shift+Enter for new line
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-card">
      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="message-input"
          rows={1}
        />
        <div className='button-wrap'>
          <button className="btn-secondary">
            <Icon name="mic" size={20} />
          </button>
          <button className="send-button" onClick={handleSend}>
            <Icon name="submitButton" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}