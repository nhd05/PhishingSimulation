import { Route, Routes } from "react-router-dom";

import Login from "./Login";
import Home from "./Home";
import Navbar from "./Navbar";
import PasswordSecurity from "./PasswordSecurity";
import Phishing from "./Phishing";
import PhishingSim from "./PhishingSim";
import Quiz from "./Quiz";
import { Results } from "./quiz_results";
import SocialEngineering from "./SocialEngineering";
import TrainingModules from "./TrainingModules";

import PhishingSim from "./PhishingSim";
import PasswordChecker from "./PasswordChecker";


function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />

				{/* Modules Page */}
				<Route path="/training" element={<TrainingModules />} />

				{/* Individual Modules */}
				<Route path="/phishing" element={<Phishing />} />
				<Route path="/passwordsecurity" element={<PasswordSecurity />} />
				<Route path="/socialengineering" element={<SocialEngineering />} />
				<Route path="/phishing-sim" element={<PhishingSim />} />
				<Route path="/password-checker" element={<PasswordChecker />} />

				{/* Quiz */}
				<Route path="/quiz" element={<Quiz />} />
				<Route path="/Results" element={<Results />} />
			</Routes>
		</div>
	);
}

export default App;
