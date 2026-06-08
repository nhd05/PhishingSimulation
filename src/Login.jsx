import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
	const navigate = useNavigate();
	const [message, setMessage] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();

		const email = event.target.email.value;
		localStorage.setItem("loggedInUser", email);

		setMessage("Login successful. Redirecting to training...");

		setTimeout(() => {
			navigate("/training");
		}, 1200);
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
					<label>Email</label>
					<input name="email" type="email" placeholder="name@example.com" required />

					<label>Password</label>
					<input name="password" type="password" placeholder="Enter password" required />

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