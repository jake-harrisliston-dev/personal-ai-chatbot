import { useState } from 'react'
import './App.css'

import LandingTitle from './components/LandingTitle/LandingTitle'
import Modal from './components/Modal/Modal'
import MeetingModal from './components/MeetingModal/MeetingModal'
import ChatInterface from './components/ChatInterface/ChatInterface'

import Navbar from './components/Navbar/Navbar'

function App() {

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
    console.log("User email logged in App.jsx: ", submitData.email)
  }

  const handleShowMeetingModal = (showMeetingModal) => {
    setShowMeetingModal(showMeetingModal)
    console.log(showMeetingModal)
  }

  return (
    <div className="chat-page">
      
      <Navbar 
      handleShowMeetingModal={handleShowMeetingModal}
      />

      <div className='gradient-overlay'></div>

      {showMeetingModal && 
      <MeetingModal />
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
      />
      }

    </div>
  )
}

export default App