import { useNavigate } from "react-router-dom";

export default function TrainingModules() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cybersecurity Training Modules</h1>

      <div style={{ border: "1px solid gray", padding: "15px", marginBottom: "15px" }}>
        <h2>Email Phishing</h2>
        <p>Learn how phishing emails trick users.</p>

        <button onClick={() => navigate("/Phishing")}>
          Start Module
        </button>
      </div>

      <div style={{ border: "1px solid gray", padding: "15px", marginBottom: "15px" }}>
        <h2>Password Security</h2>
        <p>Learn how to create secure passwords.</p>

        <button onClick={() => navigate("/Password Security")}>
          Start Module
        </button>
      </div>

      <div style={{ border: "1px solid gray", padding: "15px" }}>
        <h2>Social Engineering</h2>
        <p>Understand manipulation attacks.</p>

        <button onClick={() => navigate("/Social Engineering")}>
          Start Module
        </button>
      </div>
       <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/quiz")}
          style={{
            padding: "10px 20px",
            cursor: "pointer"
          }}
        >
          Go To Quiz
        </button>
      </div>
    </div>
  );
}