import { useState } from "react";
import { useSearchParams, useNaviagte } from "react-router-dom";
import { Results } from './quiz_results';

function shuffleArray(array) {
	return [...array].sort(() => Math.random() - 0.5);
}

function pickRandom(array, count) {
	return shuffleArray(array).slice(0, count);
}
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
		{
			id: 5,
			question: "What does a phishing email often try to create in the reader?",
			options: [
				"Curiosity",
				"A sense of urgency or fear",
				"Excitement",
				"Confusion",
			],
			feedback:
				"Phishing emails use urgency and fear to make you act without thinking.",
		},
		{
			id: 6,
			question: "Which of these is a red flag in an email sender address?",
			options: [
				"support@google.com",
				"noreply@amazon.com",
				"security@paypa1-help.net",
				"newsletter@spotify.com",
			],
			feedback:
				"Misspelled domain names like 'paypa1' instead of 'paypal' are a classic phishing indicator.",
		},
		{
			id: 7,
			question:
				"A legitimate company will never ask you to do which of the following via email?",
			options: [
				"Confirm your shipping address",
				"Read their newsletter",
				"Provide your password or full credit card number",
				"Update your preferences",
			],
			feedback:
				"Legitimate companies never ask for passwords or full payment details over email.",
		},
		{
			id: 8,
			question: "What is spear phishing?",
			options: [
				"A phishing attack sent to millions of people",
				"A targeted phishing attack using personal details about the victim",
				"A phishing attack using phone calls",
				"A phishing attack using fake websites",
			],
			feedback:
				"Spear phishing is personalized using details gathered from social media or data breaches making it much harder to spot.",
		},
	],
	socialengineering: [
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
		{
			id: 5,
			question: "What is 'baiting' in social engineering?",
			options: [
				"Sending threatening emails",
				"Leaving infected USB drives in public places hoping someone plugs them in",
				"Calling someone pretending to be IT",
				"Guessing someone's password",
			],
			feedback:
				"Baiting lures victims with something enticing like a free USB drive that contains malware.",
		},
		{
			id: 6,
			question:
				"Why do social engineering attacks often succeed even against technically secure systems?",
			options: [
				"Because firewalls don't work",
				"Because they exploit human psychology rather than technical vulnerabilities",
				"Because antivirus software is ineffective",
				"Because passwords are too short",
			],
			feedback:
				"Social engineering bypasses technical defenses by manipulating people directly.",
		},
		{
			id: 7,
			question:
				"Someone you don't recognize is following closely behind you through a secure door. This is called:",
			options: ["Pretexting", "Phishing", "Tailgating", "Baiting"],
			feedback:
				"Tailgating is when someone physically follows an authorized person into a restricted area.",
		},
		{
			id: 8,
			question: "What is the best defense against social engineering attacks?",
			options: [
				"A strong firewall",
				"Antivirus software",
				"Verifying identities before sharing any sensitive information",
				"Using a VPN",
			],
			feedback:
				"Verifying identity before acting is the most effective defense against social engineering.",
		},
	],
	passwordsecurity: [
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
		{
			id: 5,
			question: "What is credential stuffing?",
			options: [
				"Guessing passwords using common words",
				"Using stolen username and password pairs from one breach to try to access other accounts",
				"Installing a keylogger on a device",
				"Sending fake login pages via email",
			],
			feedback:
				"Credential stuffing exploits password reuse — if you use the same password everywhere, one breach can compromise all your accounts.",
		},
		{
			id: 6,
			question: "Which of these makes a password significantly stronger?",
			options: [
				"Using your pet's name",
				"Adding a number at the end",
				"Making it at least 16 characters long and random",
				"Capitalizing the first letter",
			],
			feedback:
				"Length and randomness matter more than simple substitutions like adding a number at the end.",
		},
		{
			id: 7,
			question:
				"What should you do if one of your accounts is involved in a data breach?",
			options: [
				"Wait and see if anything happens",
				"Change the password on that account only",
				"Change that password and any other accounts using the same password immediately",
				"Delete the account",
			],
			feedback:
				"You should change the breached password and any other accounts using the same password immediately to prevent credential stuffing.",
		},
		{
			id: 8,
			question: "What is a passphrase?",
			options: [
				"A password with symbols added",
				"A string of random words used as a password",
				"A PIN number",
				"A security question answer",
			],
			feedback:
				"A passphrase like 'PurpleCactus!RiverBoot42' is both strong and memorable because of its length and randomness.",
		},
	],
};

const moduleTitle = {
	phishing: "Phishing",
	socialengineering: "Social Engineering",
	passwordsecurity: "Password Security",
};

export default function Quiz() {
	const [searchParams] = useSearchParams();
	const module = searchParams.get("module") || "phishing";

	const [answers, setAnswers] = useState({});
	const [result, setResult] = useState(null);

	const [questions, setQuestions] = useState(() =>
		pickRandom(questionSets[module] || questionSets.phishing, 4),
	);

	const [shuffledOptions, setShuffledOptions] = useState(() =>
		Object.fromEntries(questions.map((q) => [q.id, shuffleArray(q.options)])),
	);

	const handleSelect = (questionId, option) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: option,
		}));
	};

	const navigate = useNavigate();
	const handleSubmit = () => {
		if (Object.keys(answers).length !== questions.length) {
			alert("Please answer all questions before submitting.");
		} else {
			naviagte("/Results");
		}

		fetch("https://phishingsimulation-cjvx.onrender.com/quiz", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				module,
				answers,
			}),
		})
			.then((res) => res.json())
			.then((data) => setResult(data))
			.catch(() => {
				alert("Backend not connected. Is Python running?");
			});
	};

	const resetQuiz = () => {
		const newQuestions = pickRandom(
			questionSets[module] || questionSets.phishing,
			4,
		);

		const newShuffled = Object.fromEntries(
			newQuestions.map((q) => [q.id, shuffleArray(q.options)]),
		);

		setQuestions(newQuestions);
		setShuffledOptions(newShuffled);
		setAnswers({});
		setResult(null);
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
			<h1 style={{ marginBottom: "30px", fontSize: "28px" }}>
				{moduleTitle[module] || module} Quiz
			</h1>

			{questions.map((q, index) => (
				<div
					key={q.id}
					style={{
						marginBottom: "25px",
						padding: "20px",
						border: "1px solid #2a2d3a",
						borderRadius: "8px",
						backgroundColor: "#1a1d27",
					}}
				>
					<p style={{ fontWeight: "bold", marginBottom: "12px" }}>
						{index + 1}. {q.question}
					</p>

					{shuffledOptions[q.id].map((option) => (
						<label
							key={option}
							style={{
								display: "flex",
								alignItems: "center",
								gap: "8px",
								padding: "8px",
								marginBottom: "6px",
								borderRadius: "5px",
								cursor: "pointer",
								backgroundColor:
									answers[q.id] === option ? "#1e3a5f" : "#0f1117",
								border:
									answers[q.id] === option
										? "1px solid #4a90d9"
										: "1px solid #2a2d3a",
								color: "#e8eaf0",
							}}
						>
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

			<div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
				<button
					type="button"
					onClick={handleSubmit}
					disabled={Object.keys(answers).length !== questions.length}
					style={{
						padding: "10px 20px",
						backgroundColor:
							Object.keys(answers).length !== questions.length
								? "#2a2d3a"
								: "#00e5a0",
						color:
							Object.keys(answers).length !== questions.length
								? "#7a7f96"
								: "#0f1117",
						border: "none",
						borderRadius: "6px",
						cursor:
							Object.keys(answers).length !== questions.length
								? "not-allowed"
								: "pointer",
						fontWeight: "600",
					}}
				>
					Submit
				</button>

				<button
					type="button"
					onClick={resetQuiz}
					style={{
						padding: "10px 20px",
						backgroundColor: "transparent",
						color: "#7a7f96",
						border: "1px solid #2a2d3a",
						borderRadius: "6px",
						cursor: "pointer",
					}}
				>
					Retry Quiz
				</button>
			</div>

			{result && (
				<div
					style={{
						marginTop: "25px",
						padding: "20px",
						backgroundColor: "#1a1d27",
						borderRadius: "8px",
						border: "1px solid #00e5a0",
					}}
				>
					<h2 style={{ margin: 0, color: "#00e5a0" }}>
						Score: {result.score} / {questions.length}
					</h2>
					<p style={{ marginTop: "8px", color: "#7a7f96" }}>{result.message}</p>
				</div>
			)}
		</div>
	);
}
