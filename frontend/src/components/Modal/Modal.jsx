import React, { useState } from "react";
import "./modal.css"
import { api } from "../../services/api";

export default function Modal({ onClose, onSubmit }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        marketing: true,
        terms: false,
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target
        
        setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
        }))
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const submitData = {
            name: formData.name || undefined,
            business: formData.company,
            email: formData.email,
            marketing: formData.marketing,
            terms: formData.terms,
        }

        console.log("Data leaving Modal.jsx: ", submitData)

        try {
            const response = await api.formSubmit(submitData)

            onSubmit(submitData)
            onClose() 
        } catch (error) {
            console.error("Error submitting form:", error)
            setError("Failed to submit form")
        }
        

    }

    

    return(
        <div className="modal-wrap">
            <div className="modal">

                <p className="form-title">Your email is required for this service</p>

                <form onSubmit={handleSubmit}>
                    {error && (
                    <div className="error-message">
                        {error}
                    </div>
                    )}

                    <div className="input-field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-field">
                        <label>Company (optional)</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="checbkox-wrap-parent">

                        <div className="checkbox-wrap">
                            <label>
                                <input 
                                    className="checkbox"
                                    type="checkbox"
                                    name="marketing"
                                    checked={formData.marketing}
                                    onChange={handleChange}
                                />
                                Send me insights into new AI approaches for my business (recommended)
                            </label>
                        </div>

                        <div className="checkbox-wrap">
                            <label>
                                <input 
                                    className="checkbox"
                                    type="checkbox"
                                    name="terms"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    required
                                />
                                I agree to the Terms & Conditions and Privacy Policy
                            </label>
                        </div>
                    </div>

                    <button className="modal-submit-btn"
                        type="submit" 
                        disabled={isLoading}
                        >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>

                    <div className="button-sub-text-wrap">
                        <p>Why is your email required?</p>
                    </div>

                </form>
            </div>  

        </div>
    )
}