export const Results = ({ answers, result, resetQuiz, questions }) => {
	return (
		<div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
			<h3>Results</h3>
			<ul style={{ listStyle: "none", textAlign: "left" }}>
				{questions.map((elem, index) => {
					return (
						<li key={questions[index].id}>
							<h5>
								{index + 1}.{questions[index].question}
							</h5>
							<p>{elem}</p>
							{answers[questions.id] !== option && (
								<p>{questions[index].feedback}</p>
							)}
						</li>
					);
				})}
			</ul>

			<button
				type="button"
				onClick={resetQuiz}
				style={{ padding: "10px", marginLeft: "10px" }}
			>
				Retry Quiz
			</button>

			{/* RESULT DISPLAY */}
			<Results
				answers={answers}
				result={result}
				resetQuiz={resetQuiz}
				questions={questions}
			/>
		</div>
	);
};
