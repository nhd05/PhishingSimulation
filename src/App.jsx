import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import TrainingModules from "./TrainingModules";

import Phishing from "./Phishing";
import PasswordSecurity from "./PasswordSecurity";
import SocialEngineering from "./SocialEngineering";

import Quiz from "./Quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      
      <Route path="/training" element={<TrainingModules />} />

      
      <Route path="/Phishing" element={<Phishing />} />
      <Route path="/PasswordSecurity" element={<PasswordSecurity />} />
      <Route path="/SocialEngineering" element={<SocialEngineering />} />

      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;