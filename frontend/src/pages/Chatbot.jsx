import { useState } from 'react'
import '../App.css'

import LandingTitle from '../components/LandingTitle/LandingTitle'
import Modal from '../components/Modal/Modal'
import ChatInterface from '../components/ChatInterface/ChatInterface'

import Navbar from '../components/Navbar/Navbar'

export default function Chatbot({ showMeetingModal }) {

  // Set initial states for page layout
  const [showLandingTitle, setShowLandingTitle] = useState(true)
  const [showChatInterface, setShowChatInterface] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // User details and credentials
  const [firstMessage, setFirstMessage] = useState(null)

  // runs on first user message send. Brings up modal and stores their fist message
  const handleStartConvo = (message) => {
    setFirstMessage(message)
    setShowModal(true)
  }
  
  // runs on modal close. Stores user email for verification. Starts chat interface
  const handleModalSubmit = () => {
    setShowLandingTitle(false)
    setShowChatInterface(true)
  }

  return (
    <div className="chat-page">
      
      <Navbar 
      onOpenModal={showMeetingModal}
      />
      
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
      aiOpenModal={showMeetingModal}
      />
      }

    </div>
  )
}