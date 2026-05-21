export default function Home() {
	const goToTraining = () => {
		window.location.href = "/training";
	};

	return (
		<div style={styles.page}>
			<nav style={styles.navbar}>
				<div style={styles.logo}>🛡️ PhishSim</div>

				<button
					type="button"
					onClick={goToTraining}
					style={styles.navButton}
				>
					Start Training
				</button>
			</nav>

			<main style={styles.main}>
				<section style={styles.hero}>
					<div style={styles.badge}>
						Welcome to your Cyber Awareness Training
					</div>

					<h1 style={styles.title}>Phishing Simulation</h1>

					<p style={styles.subtitle}>
						Learn how to recognize phishing attacks,
						protect your information, and stay secure
						online through interactive training modules.
					</p>

					<div style={styles.buttonRow}>
						<button
							type="button"
							onClick={goToTraining}
							style={styles.primaryButton}
						>
							Start Training →
						</button>
					</div>
				</section>

				<section style={styles.quickStats}>
					<div style={styles.stat}>
						✅ Learn at your own pace
					</div>

					<div style={styles.stat}>
						📊 Track your progress
					</div>

					<div style={styles.stat}>
						🔐 Stay secure online
					</div>
				</section>

				<section style={styles.cardGrid}>
					<div
						style={{
							...styles.card,
							borderTop: "4px solid #3b82f6",
						}}
					>
						<h2>📧 Phishing Detection</h2>

						<p>
							Learn how attackers disguise malicious
							emails and suspicious links.
						</p>
					</div>

					<div
						style={{
							...styles.card,
							borderTop: "4px solid #22c55e",
						}}
					>
						<h2>🔐 Password Security</h2>

						<p>
							Understand password best practices and
							stronger account protection.
						</p>
					</div>

					<div
						style={{
							...styles.card,
							borderTop: "4px solid #f59e0b",
						}}
					>
						<h2>🧠 Social Engineering</h2>

						<p>
							Explore tactics attackers use to trick
							users into unsafe actions.
						</p>
					</div>
				</section>
			</main>

			<footer style={styles.footer}>
				© 2026 PhishSim
			</footer>
		</div>
	);
}

const styles = {
	page: {
		minHeight: "100vh",
		backgroundColor: "#0f172a",
		color: "#f8fafc",
		fontFamily: "Arial, sans-serif",
	},

	navbar: {
		height: "75px",
		padding: "0 50px",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
		backgroundColor: "#111827",
	},

	logo: {
		fontSize: "24px",
		fontWeight: "bold",
	},

	navButton: {
		padding: "10px 18px",
		borderRadius: "8px",
		border: "1px solid #3b82f6",
		backgroundColor: "transparent",
		color: "#bfdbfe",
		fontWeight: "bold",
		cursor: "pointer",
	},

	main: {
		maxWidth: "1150px",
		margin: "auto",
		padding: "70px 24px",
	},

	hero: {
		textAlign: "center",
		marginBottom: "65px",
	},

	badge: {
		display: "inline-block",
		padding: "10px 18px",
		borderRadius: "999px",
		backgroundColor: "rgba(37, 99, 235, 0.15)",
		border: "1px solid rgba(59, 130, 246, 0.35)",
		color: "#bfdbfe",
		fontWeight: "bold",
		marginBottom: "24px",
	},

	title: {
		fontSize: "64px",
		marginBottom: "20px",
		fontWeight: "bold",
	},

	subtitle: {
		fontSize: "21px",
		maxWidth: "760px",
		margin: "auto",
		lineHeight: "1.7",
		color: "#cbd5e1",
	},

	buttonRow: {
		marginTop: "35px",
		display: "flex",
		justifyContent: "center",
		gap: "18px",
		flexWrap: "wrap",
	},

	primaryButton: {
		padding: "16px 30px",
		borderRadius: "10px",
		border: "none",
		backgroundColor: "#2563eb",
		color: "white",
		fontWeight: "bold",
		fontSize: "17px",
		cursor: "pointer",
		transition: "0.2s",
	},

	quickStats: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
		gap: "18px",
		marginBottom: "40px",
	},

	stat: {
		backgroundColor: "#111827",
		border: "1px solid rgba(148, 163, 184, 0.15)",
		padding: "18px",
		borderRadius: "12px",
		textAlign: "center",
		color: "#dbeafe",
	},

	cardGrid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
		gap: "24px",
		marginBottom: "35px",
	},

	card: {
		backgroundColor: "#111827",
		padding: "30px",
		borderRadius: "14px",
		border: "1px solid rgba(148, 163, 184, 0.15)",
		boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
	},

	footer: {
		textAlign: "center",
		padding: "24px",
		color: "#94a3b8",
		borderTop: "1px solid rgba(148, 163, 184, 0.1)",
	},
};
