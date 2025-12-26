import React, { useState, useEffect } from "react";
import "./meeting-modal.css"
import Cal from "@calcom/embed-react";


export default function MeetingModal ({ onClose }) {


    return(
        <div className="meeting-modal-wrap" onClick={onClose}>
            <div className="meeting-modal" onClick={(e) => e.stopPropagation()}>
                <h1 className="modal-title">Book your slot</h1>
                
                <button 
                onClick={onClose}
                >Close</button>

                <Cal calLink="jake-harris-liston-m0fd0d/30min" />

            </div>

        </div>
    )
}