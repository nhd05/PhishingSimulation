from flask import Flask, request, jsonify
from flask_cors import CORS
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from templates.phishing_emails import TEMPLATES
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL")

@app.route("/")
def home():
    return "Flask is running"


def check_answers(user_answers, correct_answers):
    score = 0
    for qid, correct in correct_answers.items():
        if user_answers.get(qid) == correct:
            score += 1
    return score


answers_key = {
    "phishing": {
        "1": "Urgent language pressuring you to act fast",
        "2": "Delete it and report it as phishing",
        "3": "URGENT: Your account will be suspended in 24 hours",
        "4": "Hover over it to check the real URL",
        "5": "A sense of urgency or fear",
        "6": "security@paypa1-help.net",
        "7": "Provide your password or full credit card number",
        "8": "A targeted phishing attack using personal details about the victim"
    },
    "socialengineering": {
        "1": "Hang up and call IT directly using the official number",
        "2": "Creating a fabricated scenario to manipulate someone into giving up information",
        "3": "Ask them to badge in separately",
        "4": "Someone impersonating a coworker to get access to files",
        "5": "Leaving infected USB drives in public places hoping someone plugs them in",
        "6": "Because they exploit human psychology rather than technical vulnerabilities",
        "7": "Tailgating",
        "8": "Verifying identities before sharing any sensitive information"
    },
    "passwordsecurity": {
        "1": "xK#9mP!qL2@w",
        "2": "A second verification step in addition to your password",
        "3": "Never — each account should have a unique password",
        "4": "Use a password manager",
        "5": "Using stolen username and password pairs from one breach to try to access other accounts",
        "6": "Making it at least 16 characters long and random",
        "7": "Change that password and any other accounts using the same password immediately",
        "8": "A string of random words used as a password"
    }
}

@app.route("/quiz", methods=["POST"])
def quiz():
    data = request.get_json()
    module = data.get("module", "phishing")
    answers = data.get("answers", {})
    correct = answers_key.get(module, answers_key["phishing"])
    score = check_answers(answers, correct)
    breakdown = {
        qid: answers.get(qid) == correct_ans
        for qid, correct_ans in correct.items()
        if qid in answers
    }

    correct_for_asked = {
        qid: correct_ans
        for qid, correct_ans in correct.items()
        if qid in answers
    }

    return jsonify({
        "score": score,
        "total": len(answers),
        "breakdown": breakdown,
        "correct_answers": correct_for_asked
    })


@app.route("/send-phishing", methods=["POST"])
def send_phishing():
    data = request.get_json()
    to_email = data.get("email")
    chosen = data.get("templates", [])

    if not to_email or not chosen:
        return jsonify({"error": "email and templates required"}), 400

    if len(chosen) > 2:
        return jsonify({"error": "max 2 templates allowed"}), 400

    errors = []
    sent = 0

    for key in chosen:
        tmpl = TEMPLATES.get(key)
        if not tmpl:
            errors.append(f"Unknown template: {key}")
            continue

        for variant in ["legit", "phishing"]:
            email = tmpl[variant]
            message = Mail(
                from_email=FROM_EMAIL,
                to_emails=to_email,
                subject=email["subject"],
                html_content=email["body"],
            )
            try:
                sg = SendGridAPIClient(SENDGRID_API_KEY)
                sg.send(message)
                sent += 1
            except Exception as e:
                errors.append(f"{key}/{variant}: {str(e)}")

    if errors:
        return jsonify({"status": "partial", "errors": errors}), 207

    return jsonify({"status": "sent", "count": sent}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
