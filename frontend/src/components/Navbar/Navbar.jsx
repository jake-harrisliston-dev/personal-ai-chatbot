import React, { useState, useEffect } from "react";
import './navbar.css'

export default function Navbar({ handleShowMeetingModal }) {

    const [showMeetingModal, setShowMeetingModal] = useState(false);

    useEffect(() => {
        if (handleShowMeetingModal) {
            handleShowMeetingModal(showMeetingModal)
        }
    }, [showMeetingModal, handleShowMeetingModal])

    return(
        <div className="navbar">
            <div className="nav-container">
                
                <div className="nav-image"></div>
                
                <div className="nav-button-wrap">
                    
                    <div className="nav-button" >About</div>
                    
                    <div 
                    className="nav-button-highlight"
                    onClick={() => setShowMeetingModal(true)}
                    >
                        Get Started
                    
                    </div>

                </div>
            </div>
        </div>
    )
}