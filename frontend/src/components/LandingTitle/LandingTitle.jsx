import {React, useState} from "react";
import "./landing-title.css"

import ChatCard from "../ChatCard/ChatCard"

export default function LandingTitle ({ handleStartConvo }) {

    const [autoMessage, setAutoMessage] = useState("")

    const presets = {
        data_entry: "My team spend lots of time and resources on data entry. How can AI help save us time?",
        follow_ups: "I'm having problems following up with leads...is there a way AI can help?",
        customer_service: "How can I use AI to support with customer service in my business?",
    }

    return(
        <div className="landing-title-wrap">
            <div className="landing-title-hero-wrap">

                <div className="chat-header">
                    <h1>Discover AI in your business</h1>
                    <p className="subtitle">
                        Describe your business to learn how artificial intelligence can benefit your business
                    </p>
                </div>

                <div className="suggestions-wrap">
                    <div className="hor-wrap">
                        
                        <div className="suggestion-button" 
                        onClick={() => setAutoMessage(presets.follow_ups)}
                        >
                            Follow ups
                        </div>

                        <div className="suggestion-button"
                        onClick={() => setAutoMessage(presets.data_entry)}
                        >
                            Data entry
                        </div>

                    </div>
                    <div className="suggestion-button"
                    onClick={() => setAutoMessage(presets.customer_service)}
                    >
                        Customer service
                    </div>
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