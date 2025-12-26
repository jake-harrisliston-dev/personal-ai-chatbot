import React, { useState, useEffect } from "react";
import './navbar.css'

export default function Navbar({ onOpenModal }) {

    return(
        <div className="navbar">
            <div className="nav-container">
                
                <div className="nav-image"></div>
                
                <div className="nav-button-wrap">
                    
                    <div className="nav-button" >About</div>
                    
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