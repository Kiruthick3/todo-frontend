import { login, signup, logout, resetLink, resetPassword, validateResetToken } from "../models/AuthModel";
import { jwtDecode } from "jwt-decode";

export const handleLogin = async (data, setError, navigate, setUser) => {
	try {
		const token = await login(data);
		localStorage.setItem("token", token);
		const decoded = jwtDecode(token);
		const fullName = `${decoded.firstName} ${decoded.lastName}`.trim();

		setUser(fullName);
		setError("");
		navigate("/"); 
	} catch (err) {
		setError(err.message || "Login failed"); 
	}
};

export const handleSignup = async (data, setError, navigate) => {
	try {
		await signup(data);
		setError("");
		navigate("/signin"); 
	} catch (err) {
		setError(err.message || "Signup Failed"); 
	}
};

export const handleResetLink = async (email, setError, setMessage) =>{
	try{
		const responseMessage = await resetLink(email);
		setMessage(responseMessage.message || "Reset link sent!");	
		setError("");
	}catch(err){
		setError(err.message || "Failed to send reset link.");
		setMessage("");
	}
};

export const handleValidateToken = async (token, navigate) => {
    try {
        await validateResetToken(token);
    } catch (error) {
        // console.error("Token validation failed:", error.message || error);
        navigate("/forgot-password");
    }
};

export const handleResetPassword = async  (token, password, setError, setMessage, navigate) => {
	try{
		const responseMessage = await resetPassword(token, password);
		setMessage(responseMessage.message || "Password reset successfully!");
		navigate("/signin");
	}catch(err){
		setError(err.message || "Password reset failed!");
		setMessage("");
	}
};

export const handleLogout = (setTodos, setUser,navigate) => {
	logout();
	setTodos([]);
	setUser(null);
	navigate("/signin"); 
};
