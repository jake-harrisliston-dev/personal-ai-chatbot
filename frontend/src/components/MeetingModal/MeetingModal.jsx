import React, { useState, useEffect } from "react";
import "./meeting-modal.css"
import Cal from "@calcom/embed-react";
import Icon from "../Icon/Icon"


export default function MeetingModal ({ onClose }) {


    return(
        <div className="meeting-modal-wrap" onClick={onClose}>
            <div className="meeting-modal" onClick={(e) => e.stopPropagation()}>
                <div className="hor-div">

                    <h1 className="modal-title">Book your slot</h1>

                    <div className="close-button" onClick={onClose}>
                        <Icon name="cross" size={20} />
                    </div>

                </div>              

                <Cal calLink="jake-harris-liston-m0fd0d/30min" />

            </div>

        </div>
    )
}