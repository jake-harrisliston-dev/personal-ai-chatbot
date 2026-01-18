import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'

// Import pages
import Chatbot from './pages/Chatbot';
import DeleteAccount from './pages/DeleteAccount';
import MeetingModal from './components/MeetingModal/MeetingModal';
import Consultation from './pages/Consultation';

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
        <Route path="/delete-my-data/:userId" element={<DeleteAccount showMeetingModal={handleShowMeetingModal} />} />
        <Route path="/consultation" element={<Consultation showMeetingModal={handleShowMeetingModal} />} />
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