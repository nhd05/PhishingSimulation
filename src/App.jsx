import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Quiz from "./Quiz";
import Training from "./Training";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/training" element={<Training />} />
			<Route path="/quiz" element={<Quiz />} />
		</Routes>
	);
}

export default App;
