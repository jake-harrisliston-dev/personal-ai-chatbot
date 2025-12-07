import { useState, useRef, useEffect } from 'react'
import './App.css'
import Icon from './components/Icon/Icon'

import LandingTitle from './components/LandingTitle/LandingTitle'
import Modal from './components/Modal/Modal'
import ChatInterface from './components/ChatInterface/ChatInterface'

function App() {

  const [showLandingTitle, setShowLandingTitle] = useState(true)
  const [showChatInterface, setShowChatInterface] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleStartConvo = (message) => {
    console.log("Message recieved in App.jsx: ", message)
    setShowLandingTitle(false)
    setShowChatInterface(true)
    setShowModal(true)
  }

  

  return (
    <div className="chat-page">
        <div className='gradient-overlay'></div>
      
      {showModal && 
      <Modal
      onClose={() => setShowModal(false)}
      />
      }
      
      {showLandingTitle && 
      <LandingTitle
        handleStartConvo={handleStartConvo}
        />
      }

      {showChatInterface && 
      <ChatInterface />
      }

    </div>
  )
}

export default App