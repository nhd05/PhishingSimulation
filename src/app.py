from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 👇 ADD IT HERE
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
    },
    "socialengineering": {
        "1": "Hang up and call IT directly using the official number",
        "2": "Creating a fabricated scenario to manipulate someone into giving up information",
        "3": "Ask them to badge in separately",
        "4": "Someone impersonating a coworker to get access to files",
    },
    "passwordsecurity": {
        "1": "xK#9mP!qL2@w",
        "2": "A second verification step in addition to your password",
        "3": "Never — each account should have a unique password",
        "4": "Use a password manager",
    }
}

@app.route("/quiz", methods=["POST"])
def quiz():
    data = request.get_json()

    module = data.get("module", "phishing")
    answers = data.get("answers", {})

    correct = answers_key.get(module, answers_key["phishing"])

    score = check_answers(answers, correct)

    return jsonify({
        "score": score,
        "total": len(correct)
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)