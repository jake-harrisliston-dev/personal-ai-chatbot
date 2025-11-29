import { useState, useRef, useEffect } from 'react'
import Icon from '../Icon/Icon'
import "./chat-card.css"

export default function ChatCard({ onSendMessage, placeholder }) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [message])

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage('') // Clear after sending
    }
  }

  return (
    <div className="chat-card">
      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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