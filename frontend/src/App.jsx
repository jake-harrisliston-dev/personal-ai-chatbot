import { useState, useRef, useEffect } from 'react'
import './App.css'
import Icon from './components/Icon/Icon'

import LandingTitle from './components/LandingTitle/LandingTitle'
import Modal from './components/Modal/Modal'
import ChatInterface from './components/ChatInterface/ChatInterface'

function App() {
  const handleSendMessage = (message) => {
    console.log('Message sent:', message)
    // Handle sending message here
  }

  const [showModal, setShowModal] = useState(true)

  return (
    <div className="chat-page">
        <LandingTitle />
        <div className='gradient-overlay'></div>
      
      {showModal && 
      <Modal
        onClose={() => setShowModal(false)}
        />
      }
    </div>
  )
}

export default App