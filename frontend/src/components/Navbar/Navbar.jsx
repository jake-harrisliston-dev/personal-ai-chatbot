import React from "react";
import './navbar.css'

export default function Navbar() {

    return(
        <div className="navbar">
            <div className="nav-container">
                
                <div className="nav-image"></div>
                
                <div className="nav-button-wrap">
                    
                    <div className="nav-button" >About</div>
                    
                    <div className="nav-button-highlight">Get Started</div>

                </div>
            </div>
        </div>
    )
}