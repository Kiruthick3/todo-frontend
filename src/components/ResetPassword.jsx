import React, { useState, useEffect } from 'react'
import { handleResetPassword, handleValidateToken } from '../controllers/AuthController';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/User.css";
const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(false);
    
    
    useEffect(() => { 
      validateToken(); 
    }, [token, navigate]);

    const validateToken = async () =>{
        try{
            // console.log("Token received from URL:", token);
            handleValidateToken(token, navigate);
            setIsTokenValid(true);
        }catch(err){
            setError("Invalid or expired token. Please request a new link.");
            setIsTokenValid(false);
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(password !== confirmPassword){
            setError("password does not match.");
            return;
        };

        setError("");
        setMessage("");
        handleResetPassword(token, password, setError, setMessage, navigate);
    }

  return (
    <>
        {isTokenValid?(<div className= "resetPassword_container">
            <div className= "resetPassword_form_container">
                <div className= "sub_container">
                    <form className="form_container" onSubmit={handleSubmit}>
                        <h1>Change Password</h1>
                        <input
                            type="password"
                            placeholder="New Password"
                            name="NewPassword"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className="input"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="ConfirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required
                            className="input"
                        />
                        {error && <div className="error_msg">{error}</div>}
                        {message && <p className="success_msg">{message}</p>}
                        <button type="submit" className="reset_btn">
                            Change Password
                        </button>
                    </form>
                </div>
            </div> 
        </div>) : (
            <div className="error_msg">{error}</div>
        )}
    </>
  )
}

export default ResetPassword;