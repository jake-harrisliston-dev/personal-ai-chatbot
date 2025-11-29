import React from "react";
import "./landing-title.css"

import ChatCard from "../ChatCard/ChatCard"

export default function LandingTitle ({}) {

    return(
        <div className="landing-title-wrap">
            <div className="chat-header">
                <h1>Discover AI in your business</h1>
                <p className="subtitle">
                    Describe your business to discover how artificial intelligence can help save you time
                </p>
            </div>

            <div className="suggestions-wrap">
                <div className="hor-wrap">
                    <div className="suggestion-button">Following up</div>
                    <div className="suggestion-button">Sourcing leads</div>
                </div>
                <div className="suggestion-button">Handling customer service</div>
            </div>

            <ChatCard placeholder={"Describe your business..."} />
        </div>

    )
}