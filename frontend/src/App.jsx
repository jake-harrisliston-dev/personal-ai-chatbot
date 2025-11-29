import { useState, useRef, useEffect } from 'react'
import './App.css'
import Icon from './components/Icon/Icon'

function App() {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [message])

  return (
    <div className="chat-page">
      <div className="container">
        <div className="chat-content">
          <div className="chat-header">
            <h1>Discover AI in your business</h1>
            <p className="subtitle">
              Describe your business to discover how artificial intelligence can help save you time
            </p>
          </div>
        </div>

        <div className="chat-card">
          <div className="input-container">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your business..."
              className="message-input"
              rows={1}
            />
            <div className='button-wrap'>
              <button className="btn-secondary">
                <Icon name="mic" size={20} />
              </button>
              <button className="send-button">
                <Icon name="submitButton" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App