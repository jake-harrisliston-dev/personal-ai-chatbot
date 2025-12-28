import React, { useState, useEffect } from "react";
import './navbar.css'

export default function Navbar({ onOpenModal }) {

    return(
        <div className="navbar">
            <div className="nav-container">
                
                <a href="https://www.jake-harrisliston.dev" target="_blank" className="nav-image"></a>    
                
                <div className="nav-button-wrap">
                    
                    <a 
                    className="nav-button" 
                    href="https://www.jake-harrisliston.dev/#about-me"
                    target="_blank"
                    >
                        About
                    </a>
                    
                    <div 
                    className="nav-button-highlight"
                    onClick={onOpenModal}
                    >
                        Get Started
                    
                    </div>

                </div>
            </div>
        </div>
    )
}