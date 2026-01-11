import { useState } from 'react'
import './App.css'

import LandingTitle from './components/LandingTitle/LandingTitle'
import Modal from './components/Modal/Modal'
import MeetingModal from './components/MeetingModal/MeetingModal'
import ChatInterface from './components/ChatInterface/ChatInterface'

import Navbar from './components/Navbar/Navbar'

function App() {

  // MUST return showLandingTitle = true; showChatInterface = false,
  const [showLandingTitle, setShowLandingTitle] = useState(true)
  const [showChatInterface, setShowChatInterface] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showMeetingModal, setShowMeetingModal] = useState(false)

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
  }

  const handleShowMeetingModal = () => {
    setShowMeetingModal(true)
  }

  const handleCloseMeetingModal = () => {
    setShowMeetingModal(false)
  }

  return (
    <div className="chat-page">
      
      <Navbar 
      onOpenModal={handleShowMeetingModal}
      />

      {showMeetingModal && 
      <MeetingModal 
      onClose={handleCloseMeetingModal}
      />
      }
      
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
      aiOpenModal={handleShowMeetingModal}
      />
      }

    </div>
  )
}

export default App