import "./App.css";
import Game from "./components/Game.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SplashScreen from "./components/SplashScreen.js";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<SplashScreen />} />
					<Route path="/Game" element={<Game />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
