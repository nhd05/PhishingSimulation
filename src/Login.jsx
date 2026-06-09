import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function Login() {
	const navigate = useNavigate();
	const [message, setMessage] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		const email = event.target.email.value;
		
		try {
		const userRef = doc(db, "users", email);
		const userSnap = await getDoc(userRef);

		if (!userSnap.exists()) {
			setMessage("User not found");
			return;
		}

		const _userData = userSnap.data();

		localStorage.setItem("loggedInUser", email);

		setMessage("Login successful. Redirecting to training...");

		setTimeout(() => {
			navigate("/training");
		}, 1200);
	} catch (error) {
		setMessage("Login error: " ${error.message});
	}
 };

	const handleForgotPassword = (event) => {
		event.preventDefault();
		setMessage("Password reset link sent. Please check your email.");
	};

	return (
		<div className="login-page">
			<div className="login-card">
				<div className="login-badge">Cyber Awareness Training</div>
				<h1>Employee Portal Login</h1>
				<p>Please sign in to access your required security training.</p>
				<form onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="name@example.com"
						required
					/>

					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						placeholder="Enter password"
						required
					/>

					<div className="login-options">
						<label className="remember">
							<input type="checkbox" />
							Remember me
						</label>
						<a href="/forgot-password" onClick={handleForgotPassword}>
							Forgot password?
						</a>
					</div>

					<button type="submit">Sign In</button>
				</form>
				{message && <p className="login-message">{message}</p>}
				<p className="simulation-note">
					Secure training portal for phishing awareness.
				</p>
			</div>
		</div>
	);
}

export default Login;
