import Navbar from '../components/Navbar/Navbar'
import { useState } from "react";
import { api } from "../services/api";
import { useParams } from 'react-router-dom';
import "./settings.css"

export default function Unsubscribe({ showMeetingModal }) {

    const [formData, setFormData] = useState({email: ""})
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [successfulDeletion, setSuccessfulDeletion] = useState(false)

    const { userId } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const submitData = {
            email: formData.email,
            userId: userId
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await api.deleteData(submitData)
            setSuccessfulDeletion(true)

        } catch (error) {
            console.error("Error submitting form:", error)
            setError("Failed to delete data. Please check your email and try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <>
        <Navbar 
        onOpenModal={showMeetingModal}
        />
        <div className="settings-wrap">
            <div className="settings-form-wrap">
                {successfulDeletion ? (
                    <div className="success-message">
                        <p className="form-title-del" >Your data has been successfully deleted</p>
                        <p>Still considering adopting AI in your business? Book your free consultation.</p>
                        <a href="https://www.jake-harrisliston.dev" target="_blank" className="button-now">Book</a>
                    </div>
            ) : (
                <div className="default-form-wrap">
                    <p className="form-title-del" >Permanently delete your data</p>
                    <p>We value your privacy. By entering your email below, all of your data will be deleted. </p>
                    <p className="important-note">Please Note: This CANNOT be undone </p>
                    

                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="error-message">
                                Sorry, there was an error submitting the form. Please check your email and try again.
                            </div>
                        )}
                        <div className="del-input-field">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                />
                            <button className="perma-delete-btn"
                            type="submit" 
                            disabled={isLoading}
                            >
                            {isLoading ? 'DELETING...' : 'DELETE'} 
                            </button>
                        </div>
                    </form>
                </div>
            )}
            </div>
        </div>
        </>
    )
}