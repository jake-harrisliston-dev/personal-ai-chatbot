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

  // User details and credentials
  const [firstMessage, setFirstMessage] = useState(null)
  const [userEmail, setUserEmail] = useState(null)

  // runs on first user message send. Brings up modal and stores their fist message
  const handleStartConvo = (message) => {
    setFirstMessage(message)
    setShowModal(true)
  }
  
  // runs on modal close. Stores user email for verification. Starts chat interface
  const handleModalSubmit = (submitData) => {
    
    setUserEmail(submitData.email)
    setShowLandingTitle(false)
    setShowChatInterface(true)
    console.log("User email logged in App.jsx: ", submitData.email)
  }

  

  return (
    <div className="chat-page">
        <div className='gradient-overlay'></div>
      
      {showModal && 
      <Modal
      onClose={() => setShowModal(false)}
      onSubmit={handleModalSubmit}
      />
      }
      
      {showLandingTitle && 
      <LandingTitle
      handleStartConvo={handleStartConvo}
      />
    }

      {showChatInterface && 
      <ChatInterface 
      first_message={firstMessage}
      email={userEmail}
      />
      }

    </div>
  )
}

export default App