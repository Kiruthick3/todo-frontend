import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TodoView from "./components/TodoView";
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
	const [user, setUser] = useState(null);
	useEffect(() =>{
		const getToken =() => localStorage.getItem("token");
		const token = getToken();
		if(token){
			const decoded = jwtDecode(token);
			// console.log("decode:", decoded);
			const fullName = `${decoded.firstName} ${decoded.lastName}`.trim();
			// console.log("users name:", fullName);
			setUser(fullName);
		}	
	},[]);

	return (
		<Routes>
			<Route path="/" element={ user ? <TodoView key={user} user={user} setUser={setUser} /> : <Navigate to="/signin" replace />} />
			<Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
			<Route path="/signin" element={!user ? <Login setUser={setUser}/> : <Navigate to="/" replace />} />
			<Route path="/forgot-password" element={!user ?<ForgotPassword /> : <Navigate to="/" replace />}/>
			<Route path="/reset-password/:token" element={<ResetPassword />} />
		</Routes>
	);
}

export default App;
