import React, { useState, useEffect } from "react";
import "./meeting-modal.css"
import { api } from "../../services/api";

export default function MeetingModal ({ onClose }) {

    return(
        <div className="meeting-modal-wrap">
            <div className="meeting-modal">
                <h1 className="modal-title">Book your slot</h1>
                <button 
                onClick={onClose}
                >Close</button>

            </div>

        </div>
    )
}