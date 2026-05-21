import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const questionSets = {
	phishing: [
		{
			id: 1,
			question: "What is a common sign of a phishing email?",
			options: [
				"A familiar sender name",
				"Urgent language pressuring you to act fast",
				"A professional logo",
				"Proper spelling and grammar",
			],
			feedback:
				"Phishing emails may pretend to be from a known and reputable organization such as banks.",
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
			feedback:
				"Phishing emails are known to have suspicious links that lead to fake pages, and request personal data.",
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
			feedback:
				"Common phishing techniques try to make the user panic so that they click on suspicious links.",
		},
		{
			id: 4,
			question: "What should you do before clicking a link in an email?",
			options: [
				"Click it immediately if it looks fine",
				"Hover over it to check the real URL",
				"Reply to the sender asking if it's real",
				"Download any attachments first",
			],
			feedback:
				"To stay safe do not click unknown links, check the sender's email address, and verify messages directly from the official website.",
		},
	],
	"social engineering": [
		{
			id: 1,
			question:
				"Someone calls claiming to be from IT and asks for your login credentials. What do you do?",
			options: [
				"Give them your credentials",
				"Hang up and call IT directly using the official number",
				"Email them your password",
				"Let them remote in immediately",
			],
			feedback:
				"Always verify the identity of anyone requesting sensitive information by contacting them through official channels.",
		},
		{
			id: 2,
			question: "What is 'pretexting' in social engineering?",
			options: [
				"Sending fake emails to steal data",
				"Creating a fabricated scenario to manipulate someone into giving up information",
				"Installing malware on a device",
				"Guessing someone's password",
			],
			feedback:
				"Pretexting involves inventing a fake scenario to gain someone's trust and extract information.",
		},
		{
			id: 3,
			question:
				"A stranger tailgates behind you into a secure building. What should you do?",
			options: [
				"Hold the door open to be polite",
				"Ignore it, they probably work there",
				"Ask them to badge in separately",
				"Report it only if they look suspicious",
			],
			feedback:
				"Always require everyone to badge in separately regardless of how legitimate they appear.",
		},
		{
			id: 4,
			question: "Which of these is an example of social engineering?",
			options: [
				"A hacker brute forcing a password",
				"Someone impersonating a coworker to get access to files",
				"A virus spreading through a USB drive",
				"A firewall blocking suspicious traffic",
			],
			feedback:
				"Social engineering exploits human trust rather than technical vulnerabilities.",
		},
	],
	"password security": [
		{
			id: 1,
			question: "Which of these is the strongest password?",
			options: ["password123", "John1990!", "xK#9mP!qL2@w", "qwerty"],
			feedback:
				"Strong passwords are long, random, and contain a mix of uppercase, lowercase, numbers, and symbols.",
		},
		{
			id: 2,
			question: "What is two-factor authentication?",
			options: [
				"Using two different passwords",
				"A second verification step in addition to your password",
				"Changing your password twice a year",
				"Using the same password on two devices",
			],
			feedback:
				"Two-factor authentication adds a second layer of security so even if your password is stolen, attackers can't get in.",
		},
		{
			id: 3,
			question:
				"How often should you reuse passwords across different accounts?",
			options: [
				"Fine if the accounts aren't important",
				"Never — each account should have a unique password",
				"Only reuse them for accounts you don't care about",
				"Fine if the password is strong",
			],
			feedback:
				"Reusing passwords means if one account is breached, all accounts using that password are at risk.",
		},
		{
			id: 4,
			question: "What is the safest way to store your passwords?",
			options: [
				"Write them in a notebook",
				"Save them in a text file on your desktop",
				"Use a password manager",
				"Memorize all of them",
			],
			feedback:
				"Password managers generate and store unique passwords for every account so you only need to remember one master password.",
		},
	],
};

export default function Quiz() {
	const [searchParams] = useSearchParams();
	const module = searchParams.get("module") || "phishing";
	const questions = questionSets[module] || questionSets.phishing;

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
			<h1>{module.charAt(0).toUpperCase() + module.slice(1)} Quiz</h1>

			{questions.map((q) => (
				<div key={q.id} style={{ marginBottom: "20px" }}>
					<p>
						<strong>{q.question}</strong>
					</p>

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

			<button
				type="button"
				onClick={resetQuiz}
				style={{ padding: "10px", marginLeft: "10px" }}
			>
				Retry Quiz
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
