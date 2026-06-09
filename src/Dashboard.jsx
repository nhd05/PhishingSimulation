import { useNavigate } from "react-router-dom";

const modules = [
	{ key: "phishing", label: "Phishing" },
	{ key: "passwordsecurity", label: "Password Security" },
	{ key: "socialengineering", label: "Social Engineering" },
];

export default function Dashboard() {
	const navigate = useNavigate();
	const user = localStorage.getItem("loggedInUser") || "guest";

	const getScores = (moduleKey) => {
		const key = `quizScore_${user}_${moduleKey}`;
		return JSON.parse(localStorage.getItem(key) || "[]");
	};

	const getBestScore = (scores) => {
		if (scores.length === 0) return null;
		return scores.reduce((best, s) => (s.score > best.score ? s : best));
	};

	const getLatestScore = (scores) => {
		if (scores.length === 0) return null;
		return scores[scores.length - 1];
	};

	return (
		<div
			style={{
				padding: "40px",
				maxWidth: "800px",
				margin: "auto",
				fontFamily: "sans-serif",
				color: "#e8eaf0",
			}}
		>
			<h1 style={{ marginBottom: "8px", fontSize: "28px" }}>
				Progress Dashboard
			</h1>
			<p style={{ color: "#7a7f96", marginBottom: "30px" }}>
				Logged in as {user}
			</p>

			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				{modules.map((mod) => {
					const scores = getScores(mod.key);
					const best = getBestScore(scores);
					const latest = getLatestScore(scores);
					const attempted = scores.length > 0;

					return (
						<div
							key={mod.key}
							style={{
								padding: "24px",
								backgroundColor: "#1a1d27",
								borderRadius: "10px",
								border: `1px solid ${attempted ? "#00e5a0" : "#2a2d3a"}`,
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									marginBottom: "12px",
								}}
							>
								<h2 style={{ margin: 0, fontSize: "20px" }}>{mod.label}</h2>
								{attempted ? (
									<span
										style={{
											color: "#00e5a0",
											fontSize: "13px",
											fontWeight: "600",
										}}
									>
										✓ Attempted
									</span>
								) : (
									<span style={{ color: "#7a7f96", fontSize: "13px" }}>
										Not attempted
									</span>
								)}
							</div>

							{attempted ? (
								<div
									style={{ display: "flex", gap: "30px", marginBottom: "16px" }}
								>
									<div>
										<p
											style={{ color: "#7a7f96", fontSize: "12px", margin: 0 }}
										>
											LATEST SCORE
										</p>
										<p
											style={{
												color: "#e8eaf0",
												fontSize: "20px",
												fontWeight: "600",
												margin: "4px 0 0",
											}}
										>
											{latest.score}/{latest.total}
										</p>
										<p
											style={{
												color: "#7a7f96",
												fontSize: "12px",
												margin: "2px 0 0",
											}}
										>
											{latest.date}
										</p>
									</div>
									<div>
										<p
											style={{ color: "#7a7f96", fontSize: "12px", margin: 0 }}
										>
											BEST SCORE
										</p>
										<p
											style={{
												color: "#00e5a0",
												fontSize: "20px",
												fontWeight: "600",
												margin: "4px 0 0",
											}}
										>
											{best.score}/{best.total}
										</p>
										<p
											style={{
												color: "#7a7f96",
												fontSize: "12px",
												margin: "2px 0 0",
											}}
										>
											{scores.length} attempt{scores.length !== 1 ? "s" : ""}
										</p>
									</div>
								</div>
							) : (
								<p
									style={{
										color: "#7a7f96",
										fontSize: "14px",
										marginBottom: "16px",
									}}
								>
									You haven't taken this quiz yet.
								</p>
							)}

							<button
								type="button"
								onClick={() => navigate(`/quiz?module=${mod.key}`)}
								style={{
									padding: "8px 16px",
									backgroundColor: attempted ? "transparent" : "#00e5a0",
									color: attempted ? "#00e5a0" : "#0f1117",
									border: "1px solid #00e5a0",
									borderRadius: "6px",
									cursor: "pointer",
									fontWeight: "600",
									fontSize: "14px",
								}}
							>
								{attempted ? "Retake Quiz" : "Start Quiz"}
							</button>
						</div>
					);
				})}
			</div>

			<button
				type="button"
				onClick={() => navigate("/training")}
				style={{
					marginTop: "30px",
					padding: "10px 20px",
					backgroundColor: "transparent",
					color: "#7a7f96",
					border: "1px solid #2a2d3a",
					borderRadius: "6px",
					cursor: "pointer",
				}}
			>
				← Back to Training
			</button>
		</div>
	);
}
