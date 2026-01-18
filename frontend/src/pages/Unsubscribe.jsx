import Navbar from '../components/Navbar/Navbar'


export default function Unsubscribe({ showMeetingModal }) {

    return(
        <>
        <Navbar 
        onOpenModal={showMeetingModal}
        />
        <div>
            Unsubscribe
        </div>
        </>
    )
}