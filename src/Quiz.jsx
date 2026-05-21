import { useState } from "react";
import { Results } from './quiz_results';

const questions = [
  {
    id: 1,
    question: "What is a common sign of a phishing email?",
    options: [
      "A familiar sender name",
      "Urgent language pressuring you to act fast",
      "A professional logo",
      "Proper spelling and grammar",
    ],
    feedback: "Phishing emails may pretend to be from a known and reputable organization such as banks."
  },
  {
    id: 2,
    question:
      "You get an email from 'support@paypa1.com' asking for your password. What do you do?",
    options: [
      "Reply with your password",
      "Click the link to verify your account",
      "Delete it and report it as phishing",
      "Forward it to a friend",
    ],
    feedback: "Phishing emails are known to have suspicious links that lead to fake pages, and request personal data."
  },
  {
    id: 3,
    question:
      "Which of these email subjects is most likely a phishing attempt?",
    options: [
      "Your weekly newsletter is here",
      "Meeting notes from today",
      "URGENT: Your account will be suspended in 24 hours",
      "Your package has shipped",
    ],
    feedback: "Common phishing techniques try to make the user panic so that they click on suspicious links."
  },
  {
    id: 4,
    question:
      "What should you do before clicking a link in an email?",
    options: [
      "Click it immediately if it looks fine",
      "Hover over it to check the real URL",
      "Reply to the sender asking if it's real",
      "Download any attachments first",
    ],
    feedback: "To stay safe do not click unknown links, check the sender's email address, and verify messages directly from the official website."
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    } else {
      return (
        <Results/>
      )
    }

    fetch("http://127.0.0.1:5000/quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      })
      .catch(() => {
        alert("Backend not connected. Is Python running?");
      });
  };

  const resetQuiz = () => {
    setAnswers({});
    setResult(null);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h1>Phishing Quiz</h1>

      {questions.map((q) => (
        <div key={q.id} style={{ marginBottom: "20px" }}>
          <p><strong>{q.question}</strong></p>

          {q.options.map((option) => (
            <label key={option} style={{ display: "block" }}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={option}
                checked={answers[q.id] === option}
                onChange={() => handleSelect(q.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={Object.keys(answers).length !== questions.length}
        style={{ padding: "10px", marginTop: "10px" }}
      >
        Submit
      </button>


      {/* RESULT DISPLAY */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            Score: {result.score} / {questions.length}
          </h2>
        </div>
      )}
    </div>
  );
}
