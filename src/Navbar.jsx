import { NavLink } from "react-router-dom";

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
				<NavLink
					to="/"
					style={({ isActive }) => ({
						color: isActive ? "#38bdf8" : "#cbd5e1",
						textDecoration: "none",
						fontSize: "0.95rem",
						fontWeight: isActive ? "700" : "500",
					})}
				>
					🏠 Home
				</NavLink>

				<NavLink
					to="/training"
					style={({ isActive }) => ({
						color: isActive ? "#38bdf8" : "#cbd5e1",
						textDecoration: "none",
						fontSize: "0.95rem",
						fontWeight: isActive ? "700" : "500",
					})}
				>
					📚 Training Modules
				</NavLink>

				<NavLink
					to="/dashboard"
					style={({ isActive }) => ({
						color: isActive ? "#38bdf8" : "#cbd5e1",
						textDecoration: "none",
						fontSize: "0.95rem",
						fontWeight: isActive ? "700" : "500",
					})}
				>
					📊 Dashboard
				</NavLink>

				<NavLink
					to="/phishing-sim"
					style={({ isActive }) => ({
						color: isActive ? "#38bdf8" : "#cbd5e1",
						textDecoration: "none",
						fontSize: "0.95rem",
						fontWeight: isActive ? "700" : "500",
					})}
				>
					🎣 Phishing Sim
				</NavLink>
			</div>
		</nav>
	);
}

export default Navbar;
