from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 1. YOUR QUIZ LOGIC GOES HERE
def check_answers(user_answers, correct_answers):
    score = 0

    for qid, correct in correct_answers.items():
        if user_answers.get(qid) == correct:
            score += 1

    return score


def display_score(score, total_questions):
    return f"{score}/{total_questions} are correct!"


# 2. CORRECT ANSWERS
answers_key = {
    "1": "Urgent language pressuring you to act fast",
    "2": "Delete it and report it as phishing",
    "3": "URGENT: Your account will be suspended in 24 hours",
    "4": "Hover over it to check the real URL"
}
@app.route("/")
def home():
    return "Flask Docker API is running!"

# 3. API ENDPOINT (React talks to this)
@app.route("/quiz", methods=["POST"])
def quiz():
    data = request.json

    score = check_answers(data, answers_key)
    message = display_score(score, len(answers_key))

    return jsonify({
        "score": score,
        "message": message
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)