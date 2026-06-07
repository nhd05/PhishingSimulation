import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import PasswordSecurity from "./PasswordSecurity";
import Phishing from "./Phishing";
import Quiz from "./Quiz";
import { Results } from "./quiz_results";
import SocialEngineering from "./SocialEngineering";
import TrainingModules from "./TrainingModules";
import Navbar from "./navbar";


function App() {
	return (
		<div>
			<Navbar />
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
			<Route path="/Results" element={<Results />} />
		</Routes>
		
	</div>
	);
}

export default App;
