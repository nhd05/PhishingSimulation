const styles = {
	page: {
		minHeight: "100vh",
		backgroundColor: "#0f172a",
		color: "#ffffff",
		fontFamily:
			"Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
		padding: "0",
		margin: "0",
	},
	main: {
		maxWidth: "1150px",
		margin: "0 auto",
		padding: "70px 24px",
	},
	hero: {
		textAlign: "center",
		marginBottom: "70px",
	},
	badge: {
		display: "inline-block",
		padding: "10px 18px",
		borderRadius: "999px",
		background: "rgba(37,99,235,0.15)",
		border: "1px solid rgba(59,130,246,0.35)",
		color: "#93c5fd",
		fontSize: "0.95rem",
		fontWeight: "600",
		marginBottom: "24px",
	},
	title: {
		fontSize: "4rem",
		fontWeight: "800",
		lineHeight: "1.1",
		marginBottom: "24px",
		color: "#f8fafc",
	},
	subtitle: {
		fontSize: "1.2rem",
		lineHeight: "1.8",
		color: "#cbd5e1",
		maxWidth: "760px",
		margin: "0 auto 40px auto",
	},
	heroButton: {
		background: "linear-gradient(90deg, #2563eb, #06b6d4)",
		border: "none",
		color: "white",
		padding: "16px 34px",
		borderRadius: "14px",
		fontSize: "1rem",
		fontWeight: "700",
		cursor: "pointer",
		boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
		transition: "transform 0.2s ease",
	},
	cardGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
		gap: "24px",
	},
	card: {
		backgroundColor: "#111827",
		padding: "32px",
		borderRadius: "20px",
		border: "1px solid rgba(255,255,255,0.06)",
		boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
		transition: "all 0.2s ease",
		lineHeight: "1.8",
	},
};

export default function Home() {
	const goToTraining = () => {
		window.location.href = "/training";
	};
	return (
		<div style={styles.page}>
			<main style={styles.main}>
				<section style={styles.hero}>
					<div style={styles.badge}>
						Welcome to your cyber awareness training
					</div>
					<h1 style={styles.title}>Phishing Simulation</h1>
					<p style={styles.subtitle}>
						Learn how to recognize phishing attacks, protect your information,
						and stay secure online through interactive training modules.
					</p>
					<button
						type="button"
						onClick={goToTraining}
						style={styles.heroButton}
					>
						Start Training →
					</button>
				</section>
				<section style={styles.cardGrid}>
					<div style={{ ...styles.card, borderTop: "4px solid #38bdf8" }}>
						<h2>📧 Phishing Detection</h2>
						<p>
							Learn how attackers disguise malicious emails and fake websites.
						</p>
					</div>
					<div style={{ ...styles.card, borderTop: "4px solid #22c55e" }}>
						<h2>🔐 Password Security</h2>
						<p>
							Understand password best practices and stronger account
							protection.
						</p>
					</div>
					<div style={{ ...styles.card, borderTop: "4px solid #f59e0b" }}>
						<h2>🧠 Social Engineering</h2>
						<p>
							Explore tactics attackers use to trick users into unsafe actions.
						</p>
					</div>
				</section>
			</main>
		</div>
	);
}
