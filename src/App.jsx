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

			{/* Modules Page */}
			<Route path="/training" element={<TrainingModules />} />

			{/* Individual Modules */}
			<Route path="/phishing" element={<Phishing />} />
			<Route path="/passwordsecurity" element={<PasswordSecurity />} />
			<Route path="/socialengineering" element={<SocialEngineering />} />

			{/* Quiz */}
			<Route path="/quiz" element={<Quiz />} />
		</Routes>
	);
}

export default App;
