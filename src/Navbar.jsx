import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav
			style={{
				backgroundColor: "#0f172a",
				padding: "16px 48px",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				borderBottom: "1px solid rgba(255,255,255,0.08)",
				position: "sticky",
				top: 0,
				zIndex: 100,
			}}
		>
			<div
				style={{
					fontSize: "1.2rem",
					fontWeight: "700",
					color: "#f8fafc",
				}}
			>
				🛡️ PhishSim
			</div>
			<div style={{ display: "flex", gap: "32px" }}>
				<Link
					to="/"
					style={{
						color: "#cbd5e1",
						textDecoration: "none",
						fontSize: "0.95rem",
						fontWeight: "500",
					}}
				>
					🏠 Home
				</Link>
				<Link
					to="/training"
					style={{
						color: "#cbd5e1",
						textDecoration: "none",
						fontSize: "0.95rem",
						fontWeight: "500",
					}}
				>
					📚 Training Modules
				</Link>
				<Link
					to="/quiz"
					style={{
						color: "#cbd5e1",
						textDecoration: "none",
						fontSize: "0.95rem",
						fontWeight: "500",
					}}
				>
					📝 Quiz
				</Link>
			</div>
		</nav>
	);
}

export default Navbar;
