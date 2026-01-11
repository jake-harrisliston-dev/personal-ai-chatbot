import React, { useState } from "react";
import "./modal.css"
import { api } from "../../services/api";

export default function Modal({ onClose, onSubmit }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        marketing: false,
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

        setIsLoading(true)

        try {
            const response = await api.formSubmit(submitData)

            onSubmit(submitData)
            onClose() 
        } catch (error) {
            console.error("Error submitting form:", error)
            setError("Failed to submit form")
        } finally {
            setIsLoading(false)
        }
        

    }

    

    return(
        <div className="modal-wrap">
            <div className="modal">

                <p className="form-title">Get AI insights tailored to your business</p>

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
                            type="email"
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
                                I agree to the {' '}
                                <a href="https://www.jake-harrisliston.dev/terms-and-conditions" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="terms-highlight">
                                 Terms & Conditions</a> and {' '}
                                <a href="https://www.jake-harrisliston.dev/privacy-policy" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="terms-highlight"
                                >
                                 Privacy Policy</a>
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
                        <p className="button-sub-text">Your email is required to prevent abuse</p>
                    </div>

                </form>
            </div>  

        </div>
    )
}