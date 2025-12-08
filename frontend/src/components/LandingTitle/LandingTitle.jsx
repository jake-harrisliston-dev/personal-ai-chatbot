import {React, useState} from "react";
import "./landing-title.css"

import ChatCard from "../ChatCard/ChatCard"

export default function LandingTitle ({ handleStartConvo }) {

    const [autoMessage, setAutoMessage] = useState("")

    const presets = {
        sourcing_leads: "I've having trouble sourcing leads",
        follow_ups: "I'm having problems following up with leads",
        customer_service: "I'm having problems maintaining high level customer service",
    }

    return(
        <div className="landing-title-wrap">
            <div className="chat-header">
                <h1>Discover AI in your business</h1>
                <p className="subtitle">
                    Describe your business to discover how artificial intelligence can benefit 
                </p>
            </div>

            <div className="suggestions-wrap">
                <div className="hor-wrap">
                    
                    <div className="suggestion-button" 
                    onClick={() => setAutoMessage(presets.follow_ups)}
                    >
                        Following up
                    </div>

                    <div className="suggestion-button"
                    onClick={() => setAutoMessage(presets.sourcing_leads)}
                    >
                        Sourcing leads
                    </div>

                </div>
                <div className="suggestion-button"
                onClick={() => setAutoMessage(presets.customer_service)}
                >
                    Handling customer service
                </div>
            </div>
        
            <ChatCard 
            onSendMessage={handleStartConvo}
            placeholder={"Describe your business..."} 
            autoMessage={autoMessage}
            />
        </div>

    )
}