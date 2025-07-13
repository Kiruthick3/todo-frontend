import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignup } from "../controllers/AuthController";
import "../styles/User.css";

const Signup = () => {
	const [data, setData] = useState({ firstName: "", lastName: "", email: "", password: "" });
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLoginRedirect = () => {
		navigate("/signin");
    }

	const handleChange = ({ target: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError("");
		handleSignup(data, setError, navigate);
	};

	return (
		<div className="signup_container">
            <div className="signup_form_container">
				<div className="sub_container">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Signup</h1>
						<input name="firstName" type="text" onChange={handleChange} value={data.firstName} placeholder="First Name" required className="input" />
						<input name="lastName" type="text" onChange={handleChange} value={data.lastName} placeholder="Last Name" required className="input" />
						<input name="email" type="email" onChange={handleChange} value={data.email} placeholder="Email" required className="input" />
						<input name="password" type="password" onChange={handleChange} value={data.password} placeholder="Password" required className="input" />
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="signup_btn" >Signup</button>
						<p className="msg">Have an account?</p>
						<button type="button" className="signin_btn" onClick={handleLoginRedirect}>
							Sign in
						</button>
					</form>
				</div>          
		    </div>
		</div>
	);
};

export default Signup;
