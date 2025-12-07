import { useState, useRef, useEffect } from 'react'
import './App.css'
import Icon from './components/Icon/Icon'

import LandingTitle from './components/LandingTitle/LandingTitle'
import Modal from './components/Modal/Modal'
import ChatInterface from './components/ChatInterface/ChatInterface'

function App() {

  const [showModal, setShowModal] = useState(false)

  

  return (
    <div className="chat-page">
        <ChatInterface />
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