import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'

// Import pages
import Chatbot from './pages/Chatbot';
import DeleteAccount from './pages/DeleteAccount';
import Unsubscribe from './pages/Unsubscribe';
import MeetingModal from './components/MeetingModal/MeetingModal';

function App() {
  
  // Handle meeting modal logic managed in app
  const [showMeetingModal, setShowMeetingModal] = useState(false)
  const handleShowMeetingModal = () => {
    setShowMeetingModal(true)
  }
  const handleCloseMeetingModal = () => {
    setShowMeetingModal(false)
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Main chatbot */}
        <Route path="/" element={<Chatbot showMeetingModal={handleShowMeetingModal} />} />
        
        {/* Utility pages */}
        <Route path="/delete-account" element={<DeleteAccount showMeetingModal={handleShowMeetingModal} />} />
        <Route path="/unsubscribe" element={<Unsubscribe showMeetingModal={handleShowMeetingModal} />} />
      </Routes>

      {showMeetingModal && 
      <MeetingModal 
      onClose={handleCloseMeetingModal}
      />
      }
    </BrowserRouter>
  );
}

export default App