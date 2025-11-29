import { useState, useRef, useEffect } from 'react'
import './App.css'
import Icon from './components/Icon/Icon'

import LandingTitle from './components/LandingTitle/LandingTitle'

function App() {
  const handleSendMessage = (message) => {
    console.log('Message sent:', message)
    // Handle sending message here
  }

  return (
    <div className="chat-page">
      <div className="container">
        <LandingTitle />
      </div>
    </div>
  )
}

export default App