import "./settings.css"
import Cal from "@calcom/embed-react";
import Navbar from "../components/Navbar/Navbar";


export default function Consultation ({ showMeetingModal }) {


    return(
        <>
        <Navbar 
            onOpenModal={showMeetingModal}
        />
        <div className="settings-wrap">
            <div className="cal-container">

                <Cal calLink="jake-harris-liston-m0fd0d/30min" />

            </div>

        </div>
        </>
    )
}