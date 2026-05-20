import { useNavigate } from "react-router-dom";

export default function Training() {
	const navigate = useNavigate();

	return (
		<div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
			<h1>Phishing Training (Demo 0.5)</h1>

			{/* ARTICLE CONTENT */}
			<h2>What is Phishing?</h2>
			<p>
				Phishing is a type of cyber attack where attackers pretend to be trusted
				organizations in order to steal sensitive information such as passwords,
				credit card details, or personal data.
			</p>

			<h2>Common Phishing Techniques</h2>
			<ul>
				<li>Fake emails pretending to be banks or companies</li>
				<li>Urgent messages like “Your account will be locked”</li>
				<li>Suspicious links that lead to fake login pages</li>
				<li>Requests for passwords or personal data</li>
			</ul>

			<h2>Example Phishing Email</h2>
			<p style={{ border: "1px solid gray", padding: "10px" }}>
				Subject: Urgent - Your account has been compromised
				<br />
				<br />
				Dear user,
				<br />
				We detected unusual activity. Please verify your account immediately
				<br />
				by clicking the link below or your account will be suspended.
			</p>

			<h2>How to Stay Safe</h2>
			<ul>
				<li>Always check the sender’s email address</li>
				<li>Do not click unknown links</li>
				<li>Do not enter passwords from email links</li>
				<li>Verify messages directly from official websites</li>
			</ul>

			{/* BUTTON TO NEXT PAGE */}
			<button
				type="button"
				onClick={() => navigate("/quiz")}
				style={{
					marginTop: "20px",
					padding: "10px 15px",
					cursor: "pointer",
				}}
			>
				Next: Take Quiz
			</button>

			{/* SOURCE / REFERENCE SECTION */}
			<hr style={{ marginTop: "30px" }} />

			<h3>Reference</h3>
			<p>
				This content is adapted from publicly available cybersecurity awareness
				resources for educational/demo purposes only.
			</p>

			<p>
				Example sources:
				<br />- OWASP Phishing Guide
				<br />- Microsoft Security Awareness Training
			</p>
		</div>
	);
}
