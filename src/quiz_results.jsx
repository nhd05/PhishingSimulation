import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./firebase";

export const Results = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {
		score,
		total,
		breakdown,
		correctAnswers,
		questions,
		answers,
		module,
	} = location.state || {};
	
	useEffect(() => {
        if (!questions || !answers) return;

        async function saveResult() {
            try {
                await addDoc(collection(db, "quizResults"), {
                    score,
                    totalQuestions: total,
                    percentage: (score / total) * 100,
                    module,
                });

                console.log("Quiz result saved");
            } catch (error) {
                console.error("Error saving quiz result:", error);
            }
        }

        saveResult();
    }, []);

	if (!questions || !answer) {
		return (
			<div style={{ padding: "40px", color: "#e8eaf0", textAlign: "center" }}>
				<p>No results found. Please take a quiz first.</p>
				<button
					type="button"
					onClick={() => navigate("/training")}
					style={{
						marginTop: "20px",
						padding: "10px 20px",
						backgroundColor: "#00e5a0",
						color: "#0f1117",
						border: "none",
						borderRadius: "6px",
						cursor: "pointer",
						fontWeight: "600",
					}}
				>
					Go to Training
				</button>
			</div>
		);
	}

	const handleRetry = () => {
		navigate(`/quiz?module=${module}`);
	};

	return (
		<div
			style={{
				padding: "40px",
				maxWidth: "700px",
				margin: "auto",
				fontFamily: "sans-serif",
				color: "#e8eaf0",
			}}
		>
			<h1 style={{ marginBottom: "10px", fontSize: "28px" }}>Results</h1>

			{/* Score display */}
			<div
				style={{
					marginBottom: "30px",
					padding: "20px",
					backgroundColor: "#1a1d27",
					borderRadius: "8px",
					border: "1px solid #00e5a0",
				}}
			>
				<h2 style={{ margin: 0, color: "#00e5a0" }}>
					Score: {score} / {total}
				</h2>
				<p style={{ marginTop: "8px", color: "#7a7f96" }}>
					{score === total
						? "Perfect score!"
						: score >= total / 2
							? "Good work — review the ones you missed."
							: "Keep practicing — go back and review the training."}
				</p>
			</div>

			{/* Question breakdown */}
			<ul style={{ listStyle: "none", padding: 0 }}>
				{questions.map((q, index) => {
					const qid = String(q.id);
					const isCorrect = breakdown ? breakdown[qid] : false;
					const userAnswer = answers[q.id];
					const correctAnswer = correctAnswers ? correctAnswers[qid] : null;

					return (
						<li
							key={q.id}
							style={{
								marginBottom: "20px",
								padding: "20px",
								borderRadius: "8px",
								backgroundColor: "#1a1d27",
								border: `1px solid ${isCorrect ? "#00e5a0" : "#ff4d6d"}`,
							}}
						>
							<p style={{ fontWeight: "bold", marginBottom: "8px" }}>
								{index + 1}. {q.question}
							</p>
							<p
								style={{
									color: isCorrect ? "#00e5a0" : "#ff4d6d",
									marginBottom: "4px",
								}}
							>
								{isCorrect ? "✓ Correct" : "✗ Incorrect"}
							</p>
							<p style={{ color: "#7a7f96", fontSize: "14px" }}>
								Your answer: {userAnswer}
							</p>
							{!isCorrect && correctAnswer && (
								<p style={{ color: "#00e5a0", fontSize: "14px" }}>
									Correct answer: {correctAnswer}
								</p>
							)}
							{!isCorrect && (
								<p
									style={{
										color: "#7a7f96",
										fontSize: "13px",
										marginTop: "8px",
										fontStyle: "italic",
									}}
								>
									{q.feedback}
								</p>
							)}
						</li>
					);
				})}
			</ul>


			<div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
				<button
					type="button"
					onClick={handleRetry}
					style={{
						padding: "10px 20px",
						backgroundColor: "#00e5a0",
						color: "#0f1117",
						border: "none",
						borderRadius: "6px",
						cursor: "pointer",
						fontWeight: "600",
					}}
				>
					Retry Quiz
				</button>
				<button
					type="button"
					onClick={() => navigate("/training")}
					style={{
						padding: "10px 20px",
						backgroundColor: "transparent",
						color: "#7a7f96",
						border: "1px solid #2a2d3a",
						borderRadius: "6px",
						cursor: "pointer",
					}}
				>
					Back to Training
				</button>
			</div>
		</div>
	);
};
