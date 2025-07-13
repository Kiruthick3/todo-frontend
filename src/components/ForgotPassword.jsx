import React, { useState } from 'react'
import { handleResetLink } from '../controllers/AuthController';
import "../styles/User.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        setError("");
        setMessage("");
        handleResetLink(email, setError, setMessage);
    }
  return (
    <>
     <div className= "forgotPassword_container">
			<div className= "forgotPassword_form_container">
				<div className= "sub_container">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Forgot Password</h1>
						<input
							type="email"
							placeholder="Enter your email"
							name="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						{message && <p className="success_msg">{message}</p>}
						<button type="submit" className="reset_btn">
							Send Link
						</button>
					</form>
				</div>
			</div>
		</div>
    </>
  )
}

export default ForgotPassword;