import { useState } from "react";

const TEMPLATES = [
	{ id: "prize", label: "Winning a prize", icon: "🎁" },
	{ id: "urgency", label: "Account suspended", icon: "⚠️" },
	{ id: "it", label: "IT / password reset", icon: "💻" },
	{ id: "bank", label: "Bank fraud alert", icon: "🏦" },
];

const PHISHING_SUBJECTS = {
	prize: "🎉 WINNER! Claim your $500 gift card NOW — expires in 2 hrs",
	urgency: "⚠️ URGENT: Your account has been compromised — act within 24hrs",
	it: "IT ALERT: Your password expires in 1 hour — reset immediately",
	bank: "🚨 FRAUD ALERT: Unauthorized $2,847.00 transaction — verify NOW",
};

const LEGIT_SUBJECTS = {
	prize: "You have a reward waiting — check the app",
	urgency: "We noticed a new sign-in to your account",
	it: "Reminder: Update your password in the employee portal",
	bank: "Transaction alert: $2,847.00 charge on your account",
};

const EXPLANATIONS = {
	prize:
		"The phishing email used ALL CAPS, fake urgency, a suspicious prize, and asked for billing info. The real one directed you to log in yourself.",
	urgency:
		"The phishing email used threatening language, red text, and a suspicious link. The real one told you to visit the site directly.",
	it: "The phishing email pressured you to click a link and enter your current password — IT will never ask for that. The real one directed you to the portal yourself.",
	bank: "The phishing email created panic with a fake fraud alert and a suspicious link. The real one told you to call the number on your card.",
};

function PhishingSim() {
	const [email, setEmail] = useState("");
	const [selected, setSelected] = useState([]);
	const [status, setStatus] = useState("idle"); // idle | loading | success | feedback | result
	const [guesses, setGuesses] = useState({});
	const [score, setScore] = useState(null);

	const toggleTemplate = (id) => {
		setSelected((prev) =>
			prev.includes(id)
				? prev.filter((t) => t !== id)
				: prev.length < 2
					? [...prev, id]
					: prev,
		);
	};

	const handleSend = async () => {
		setStatus("loading");
		try {
			const res = await fetch(
				"https://phishingsimulation-backend.onrender.com/send-phishing",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, templates: selected }),
				},
			);

			const data = await res.json();
			console.log("Response:", data);

			if (res.ok) {
				setStatus("success");
			} else {
				setStatus("error");
			}
		} catch (err) {
			console.error(err);
			setStatus("error");
		}
	};

	const isValid = email.includes("@") && selected.length > 0;

	if (status === "success") {
		return (
			<div className="sim-wrap">
				<div className="sim-card">
					<h2>✅ Check your inbox!</h2>
					<p>
						We sent you <strong>{selected.length * 2} emails</strong> — one real
						and one phishing for each type. Can you spot which is which?
					</p>
					<button
						type="button"
						onClick={() => {
							setStatus("idle");
							setEmail("");
							setSelected([]);
						}}
					>
						Try another
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="sim-wrap">
			<div className="sim-card">
				<span className="sim-badge">Security Training</span>
				<h2>Phishing Simulation</h2>
				<p className="sim-sub">
					Enter your email and pick a scenario. You'll get two emails — one
					legitimate and one phishing. Practice spotting the difference. (PLEASE
					USE YOUR UW EMAIL FOR THE DEMO)
				</p>

				<label htmlFor="email">Your email address</label>
				<input
					id="email"
					type="email"
					placeholder="you@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<p style={{ marginTop: "1rem", fontWeight: "500" }}>
					Choose a scenario (pick 1–2)
				</p>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
						margin: "0.5rem 0 1.25rem",
					}}
				>
					{TEMPLATES.map((t) => {
						const isChecked = selected.includes(t.id);
						return (
							<label
								key={t.id}
								style={{
									display: "flex",
									alignItems: "center",
									gap: "12px",
									padding: "12px 16px",
									border: isChecked ? "2px solid #3b82f6" : "1px solid #e5e7eb",
									borderRadius: "8px",
									cursor:
										selected.length >= 2 && !isChecked
											? "not-allowed"
											: "pointer",
									background: isChecked ? "#eff6ff" : "white",
									opacity: selected.length >= 2 && !isChecked ? 0.5 : 1,
								}}
							>
								<input
									type="checkbox"
									checked={isChecked}
									onChange={() => toggleTemplate(t.id)}
									disabled={selected.length >= 2 && !isChecked}
									style={{
										width: "18px",
										height: "18px",
										accentColor: "#3b82f6",
										cursor: "pointer",
									}}
								/>
								<span style={{ fontSize: "14px" }}>
									{t.icon} {t.label}
								</span>
							</label>
						);
					})}
				</div>

				{status === "error" && (
					<p style={{ color: "red", fontSize: "13px" }}>
						Something went wrong. Make sure Flask is running.
					</p>
				)}

				<button
					type="button"
					className="sim-send-btn"
					disabled={!isValid || status === "loading"}
					onClick={handleSend}
				>
					{status === "loading" ? "Sending..." : "Send me the emails"}
				</button>
			</div>
		</div>
	);
}

export default PhishingSim;