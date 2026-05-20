import Home from "./Home";
import PasswordSecurity from "./PasswordSecurity";
import Phishing from "./Phishing";
import Quiz from "./Quiz";
import SocialEngineering from "./SocialEngineering";
import TrainingModules from "./TrainingModules";

import { Route, Routes } from "react-router-dom";

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
