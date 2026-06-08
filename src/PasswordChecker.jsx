import { useState } from "react";
import { useNavigate } from "react-router-dom";

function calculateEntropy(password) {
  let charset = 0;
  if (/[a-z]/.test(password)) charset += 26;
  if (/[A-Z]/.test(password)) charset += 26;
  if (/[0-9]/.test(password)) charset += 10;
  if (/[^A-Za-z0-9]/.test(password)) charset += 32;
  if (charset === 0) return 0;
  return password.length * Math.log2(charset);
}

export default function PasswordChecker() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const entropy = calculateEntropy(password);

  const suggestions = [];
  if (password.length < 8) suggestions.push("Use at least 8 characters");
  if (!/[A-Z]/.test(password)) suggestions.push("Add an uppercase letter");
  if (!/[a-z]/.test(password)) suggestions.push("Add a lowercase letter");
  if (!/[0-9]/.test(password)) suggestions.push("Include a number");
  if (!/[^A-Za-z0-9]/.test(password)) suggestions.push("Add a special character (!@#$...)");

  const getStrength = () => {
    if (!password) return null;
    if (entropy < 28) return { label: "Weak", color: "#ef4444" };
    if (entropy < 50) return { label: "Medium", color: "#f97316" };
    return { label: "Strong", color: "#22c55e" };
  };

  const strength = getStrength();

  const getBarWidth = () => {
    if (!password) return "0%";
    if (entropy < 28) return "33%";
    if (entropy < 50) return "66%";
    return "100%";
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#ffffff" }}>
    <div style={{ padding: "20px", maxWidth: "500px", margin: "80px auto 40px", textAlign: "left" }}>
        <h1 style={{ fontSize: "28px", letterSpacing: "normal", margin: "0 0 1rem", color: "#ffffff" }}>
      🔐 Password Checker</h1>
      <p style={{ color: "#6b7280" }}>
  Test how strong your password is. Try different combinations and see
  how entropy and strength change in real time.
</p>

<div style={{
  padding: "1rem",
  background: "#eff6ff",
  border: "1px solid #bfdbfe",
  borderRadius: "8px",
  marginBottom: "1.5rem",
}}>
  <p style={{ fontSize: "13px", color: "#1e40af", margin: 0, lineHeight: "1.7" }}>
    <strong>What is entropy?</strong> Entropy measures how difficult a password is to guess. 
    Passwords with more characters, a mix of different character types, and less predictable 
    patterns have higher entropy and are considered stronger. Entropy is measured in bits — 
    for example, a score of 65 bits corresponds to roughly 37 quintillion possible combinations. 
    The higher the entropy, the harder the password is to crack through brute-force attacks.
  </p>
</div>

      <label style={{ fontSize: "13px", color: "#374151" }}>Enter a password</label>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type a password to test..."
        style={{
          width: "100%",
          padding: "10px 12px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          fontSize: "15px",
          marginTop: "6px",
          boxSizing: "border-box",
          fontFamily: "monospace",
        }}
      />

      {password && (
        <div style={{ marginTop: "1.5rem" }}>
          {/* Strength bar */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "13px", color: "#6b7280" }}>Strength</span>
            <span style={{ fontSize: "13px", fontWeight: 500, color: strength.color }}>
              {strength.label}
            </span>
          </div>
          <div style={{ background: "#e5e7eb", borderRadius: "4px", height: "8px", marginBottom: "1.25rem" }}>
            <div style={{
              width: getBarWidth(),
              height: "100%",
              background: strength.color,
              borderRadius: "4px",
              transition: "width 0.3s ease",
            }} />
          </div>

          {/* Entropy */}
          <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 1rem" }}>
            Entropy: <strong>{entropy.toFixed(2)} bits</strong>
          </p>

          {/* Suggestions */}
          {suggestions.length > 0 ? (
            <div style={{
              padding: "1rem",
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              borderRadius: "8px",
            }}>
              <p style={{ fontSize: "13px", fontWeight: 500, margin: "0 0 8px", color: "#374151" }}>
                Suggestions to improve:
              </p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                {suggestions.map((s, i) => (
                  <li key={i} style={{ fontSize: "13px", color: "#ef4444", marginBottom: "4px" }}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div style={{
              padding: "1rem",
              background: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "8px",
            }}>
              <p style={{ fontSize: "13px", color: "#22c55e", fontWeight: 500, margin: 0 }}>
                ✅ Great password!
              </p>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate(-1)}
        style={{ marginTop: "2rem", padding: "10px 20px", cursor: "pointer" }}
      >
        ← Go Back
      </button>
    </div>
    </div>
  );
}