import { useState } from "react";

const TEMPLATES = [
  { id: "prize", label: "Winning a prize", icon: "🎁" },
  { id: "urgency", label: "Account suspended", icon: "⚠️" },
  { id: "it", label: "IT / password reset", icon: "💻" },
  { id: "bank", label: "Bank fraud alert", icon: "🏦" },
];

function PhishingSim() {
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

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

  const isValid = email.includes("@") && selected.length > 0;

  if (status === "success") {
    return (
      <div className="sim-wrap">
        <div className="sim-card">
          <h2>✅ Check your inbox!</h2>
          <p>
            We sent you <strong>{selected.length * 2} emails</strong> — one
            real and one phishing for each type. Can you spot which is which?
          </p>
          <button onClick={() => { setStatus("idle"); setEmail(""); setSelected([]); }}>
            Try another
          </button>
        </div>
      </div>
    );
  }

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