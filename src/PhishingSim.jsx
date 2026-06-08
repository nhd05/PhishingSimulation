import { useState } from "react";

const TEMPLATES = [
  { id: "prize", label: "Winning a prize", icon: "🎁" },
  { id: "urgency", label: "Account suspended", icon: "⚠️" },
  { id: "it", label: "IT / password reset", icon: "💻" },
  { id: "bank", label: "Bank fraud alert", icon: "🏦" },
];

const PHISHING_SUBJECTS = {
  prize: "🎉 WINNER! Claim your $500 gift card NOW — expires in 2 hrs",
  urgency: "⚠️ URGENT: Your account has been compromised — act within 24hrs",
  it: "IT ALERT: Your password expires in 1 hour — reset immediately",
  bank: "🚨 FRAUD ALERT: Unauthorized $2,847.00 transaction — verify NOW",
};

const LEGIT_SUBJECTS = {
  prize: "You have a reward waiting — check the app",
  urgency: "We noticed a new sign-in to your account",
  it: "Reminder: Update your password in the employee portal",
  bank: "Transaction alert: $2,847.00 charge on your account",
};

const EXPLANATIONS = {
  prize: "The phishing email used ALL CAPS, fake urgency, a suspicious prize, and asked for billing info. The real one directed you to log in yourself.",
  urgency: "The phishing email used threatening language, red text, and a suspicious link. The real one told you to visit the site directly.",
  it: "The phishing email pressured you to click a link and enter your current password — IT will never ask for that. The real one directed you to the portal yourself.",
  bank: "The phishing email created panic with a fake fraud alert and a suspicious link. The real one told you to call the number on your card.",
};

function PhishingSim() {
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | feedback | result
  const [guesses, setGuesses] = useState({});
  const [score, setScore] = useState(null);

  const toggleTemplate = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((t) => t !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    );
  };

  const handleSend = async () => {
    setStatus("loading");
    try {
      const res = await fetch("http://localhost:5000/send-phishing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, templates: selected }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const handleGuess = (templateId, subject) => {
    setGuesses((prev) => ({ ...prev, [templateId]: subject }));
  };

  const handleSubmitGuesses = () => {
    let correct = 0;
    selected.forEach((id) => {
      if (guesses[id] === PHISHING_SUBJECTS[id]) correct++;
    });
    setScore(correct);
    setStatus("result");
  };

  const allGuessed = selected.every((id) => guesses[id]);
  const isValid = email.includes("@") && selected.length > 0;

  // Step 2: feedback — user guesses which email was phishing
  if (status === "success" || status === "feedback") {
    return (
      <div className="sim-wrap">
        <div className="sim-card">
          <h2>📬 Check your inbox!</h2>
          <p>
            We sent you <strong>{selected.length * 2} emails</strong>. Now guess — which subject line was the phishing email?
          </p>
          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "1.5rem" }}>
            Don't forget to check your spam folder too!
          </p>

          {selected.map((id) => {
            const tmpl = TEMPLATES.find((t) => t.id === id);
            return (
              <div key={id} style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontWeight: 500, marginBottom: "8px" }}>
                  {tmpl.icon} {tmpl.label} — which was the phishing email?
                </p>

                {[LEGIT_SUBJECTS[id], PHISHING_SUBJECTS[id]]
                  .sort(() => Math.random() - 0.5)
                  .map((subject) => (
                    <label
                      key={subject}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        padding: "10px 14px",
                        border: guesses[id] === subject ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                        borderRadius: "8px",
                        marginBottom: "8px",
                        cursor: "pointer",
                        background: guesses[id] === subject ? "#eff6ff" : "white",
                        fontSize: "13px",
                        lineHeight: "1.5",
                      }}
                    >
                      <input
                        type="radio"
                        name={id}
                        value={subject}
                        checked={guesses[id] === subject}
                        onChange={() => handleGuess(id, subject)}
                        style={{ marginTop: "2px", accentColor: "#3b82f6" }}
                      />
                      {subject}
                    </label>
                  ))}
              </div>
            );
          })}

          <button
            className="sim-send-btn"
            disabled={!allGuessed}
            onClick={handleSubmitGuesses}
          >
            Submit my answers
          </button>
        </div>
      </div>
    );
  }

  // Step 3: results
  if (status === "result") {
    return (
      <div className="sim-wrap">
        <div className="sim-card">
          <h2>
            {score === selected.length ? "🎉 Perfect score!" : score === 0 ? "😬 Not quite!" : "👍 Good effort!"}
          </h2>
          <p style={{ fontSize: "16px", marginBottom: "1.5rem" }}>
            You got <strong>{score} out of {selected.length}</strong> correct.
          </p>

          {selected.map((id) => {
            const tmpl = TEMPLATES.find((t) => t.id === id);
            const isCorrect = guesses[id] === PHISHING_SUBJECTS[id];
            return (
              <div
                key={id}
                style={{
                  border: `1px solid ${isCorrect ? "#86efac" : "#fca5a5"}`,
                  borderRadius: "8px",
                  padding: "14px 16px",
                  marginBottom: "1rem",
                  background: isCorrect ? "#f0fdf4" : "#fef2f2",
                }}
              >
                <p style={{ fontWeight: 500, margin: "0 0 6px" }}>
                  {isCorrect ? "✅" : "❌"} {tmpl.icon} {tmpl.label}
                </p>
                <p style={{ fontSize: "13px", color: "#374151", margin: "0 0 6px" }}>
                  <strong>The phishing email was:</strong> "{PHISHING_SUBJECTS[id]}"
                </p>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                  {EXPLANATIONS[id]}
                </p>
              </div>
            );
          })}

          <button
            className="sim-send-btn"
            style={{ marginTop: "1rem" }}
            onClick={() => { setStatus("idle"); setEmail(""); setSelected([]); setGuesses({}); setScore(null); }}
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Step 1: the form
  return (
    <div className="sim-wrap">
      <div className="sim-card">
        <span className="sim-badge">Security Training</span>
        <h2>Phishing Simulation</h2>
        <p className="sim-sub">
          Enter your email and pick a scenario. You'll get two emails — one
          legitimate and one phishing. Practice spotting the difference. (PLEASE USE YOUR UW EMAIL FOR THE DEMO)
        </p>

        <label>Your email address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{ marginTop: "1rem" }}>
          Choose a scenario (pick 1–2)
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "0.5rem 0 1.25rem" }}>
          {TEMPLATES.map((t) => {
            const isChecked = selected.includes(t.id);
            return (
              <label
                key={t.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  border: isChecked ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                  borderRadius: "8px",
                  cursor: selected.length >= 2 && !isChecked ? "not-allowed" : "pointer",
                  background: isChecked ? "#eff6ff" : "white",
                  opacity: selected.length >= 2 && !isChecked ? 0.5 : 1,
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleTemplate(t.id)}
                  disabled={selected.length >= 2 && !isChecked}
                  style={{ width: "18px", height: "18px", accentColor: "#3b82f6", cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px" }}>{t.icon} {t.label}</span>
              </label>
            );
          })}
        </div>

        {status === "error" && (
          <p style={{ color: "red", fontSize: "13px" }}>
            Something went wrong. Make sure Flask is running.
          </p>
        )}

        <button
          className="sim-send-btn"
          disabled={!isValid || status === "loading"}
          onClick={handleSend}
        >
          {status === "loading" ? "Sending..." : "Send me the emails"}
        </button>
      </div>
    </div>
  );
}

export default PhishingSim;