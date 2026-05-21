import { useNavigate } from "react-router-dom";

export default function TrainingModules() {
	const navigate = useNavigate();

	return (
		<div style={{ padding: "20px" }}>
			<h1>Cybersecurity Training Modules</h1>

			<div
				style={{
					border: "1px solid gray",
					padding: "15px",
					marginBottom: "15px",
				}}
			>
				<h2>Email Phishing</h2>
				<p>Learn how phishing emails trick users.</p>

				<button type="button" onClick={() => navigate("/Phishing")}>
					Start Module
				</button>
			</div>

			<div
				style={{
					border: "1px solid gray",
					padding: "15px",
					marginBottom: "15px",
				}}
			>
				<h2>Password Security</h2>
				<p>Learn how to create secure passwords.</p>

				<button type="button" onClick={() => navigate("/PasswordSecurity")}>
					Start Module
				</button>
			</div>

			<div style={{ border: "1px solid gray", padding: "15px" }}>
				<h2>Social Engineering</h2>
				<p>Understand manipulation attacks.</p>

				<button type="button" onClick={() => navigate("/SocialEngineering")}>
					Start Module
				</button>
			</div>
		</div>
	);
}
