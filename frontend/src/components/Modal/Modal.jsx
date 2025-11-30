import React from "react";
import "./modal.css"

export default function Modal({}) {

    

    return(
        <div className="modal-wrap">
            <div className="modal">

                <p className="form-title">Your email is required for this service</p>

                <form /*onSubmit={handleSubmit}*/>
                    {/*{error && (
                    <div className="error-message">
                        {error}
                    </div>
                    )}*/}

                    <div className="input-field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            /* value={formData.name} */
                        />
                    </div>

                    <div className="input-field">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            /* value={formData.email} */
                            required
                        />
                    </div>

                    <div className="checbkox-wrap-parent">

                        <div className="checkbox-wrap">
                            <label>
                                <input 
                                    className="checkbox"
                                    type="checkbox"
                                    name="marketing"
                                    /* value={formData.marketing} */
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
                                    /* value={formData.marketing} */
                                    required
                                />
                                I agree to the Terms & Conditions and Privacy Policy
                            </label>
                        </div>
                    </div>

                    <button className="modal-submit-btn">
                        Submit
                        {/* type="submit" 
                        disabled={isLoading}
                        className="btn btn-secondary"
                        >
                        {isLoading ? 'Submitting...' : 'Submit'} */}
                    </button>

                    <div className="button-sub-text-wrap">
                        <p>Why is your email required?</p>
                    </div>

                </form>
            </div>  

        </div>
    )
}