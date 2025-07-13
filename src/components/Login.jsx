import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../controllers/AuthController";
import "../styles/User.css";

const Login = ({setUser}) => {
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const navigate = useNavigate();

    const handleSignupRedirect = () => {
		navigate("/signup");
	};

	const handleForgotPasswordRedirect = () => {
		navigate("/forgot-password");
	}
	const handleChange = ({ target: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		handleLogin(data, setError, navigate,setUser);
	};

	return (
        <div className= "login_container">
			<div className= "login_form_container">
				<div className= "sub_container">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<p className="forgot_password" onClick={handleForgotPasswordRedirect}>forgot password?</p>
						<button type="submit" className="signin_btn">
							Sign In
						</button>
						<p>New Here?</p>
                    	<button type="button" className="signup_btn" onClick={handleSignupRedirect}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
