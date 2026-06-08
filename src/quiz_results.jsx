import { useLocation, useNavigate } from "react-router-dom";

export const Results = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { answers, result, questions } = location.state || {};

	if (!result || !questions) {
		return <h2>No quiz results found.</h2>;
	}

	const resetQuiz = () => {
		navigate("/quiz");
	};

	return (
		<div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
			<h2>Quiz Results</h2>

			<h3>
				Score: {result.score}/{questions.length}
			</h3>

			<ul style={{ listStyle: "none", padding: 0 }}>
				{questions.map((elem, index) => (
					<li key={elem.id} style={{ marginBottom: "20px" }}>
						<h4>
							{index + 1}. {elem.question}
						</h4>

						<p>
							<strong>Your Answer:</strong> {answers[elem.id]}
						</p>

						<p>{elem.feedback}</p>
					</li>
				))}
			</ul>

			<button onClick={resetQuiz}>Retry Quiz</button>
		</div>
	);
};