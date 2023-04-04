import "./App.css";
import Game from "./components/Game.js";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
	
	const navigate = useNavigate();

	const navigateToGamePage = () => {
		navigate("/Game");
	};

	return (
		<div className="App">
			<div>
				<h1>Trivia.io</h1>
				<button onClick={navigateToGamePage}>Play!</button>
			</div>

			<Routes>
				<Route path="/Game" element={<Game />} />
			</Routes>
		</div>
	);
}

export default App;
