import Navbar from '../components/Navbar/Navbar'

export default function DeleteAccount({ showMeetingModal }) {

    return(
        <>
        <Navbar 
        onOpenModal={showMeetingModal}
        />
        <div>
            Delete Account
        </div>
        </>
    )
}