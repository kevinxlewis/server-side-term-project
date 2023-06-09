import "./App.css";
import Game from "./components/Game.js";
import Stats from "./components/Stats";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SplashScreen from "./components/SplashScreen.js";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	let [questions, setQuestions] = useState(); 

	useEffect(() => {
		fetch("/api/questions")
		.then(res => res.json())
		.then(setQuestions)
		.catch(e => console.log(e))
	}, [])

	if(questions == null) {
		return <h2>Loading application.. Please wait.</h2>
	}


	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<SplashScreen questionList={(questions)} setQuestions={setQuestions} />} />
					<Route path="/Game" element={<Game questionList={(questions)} setQuestions={setQuestions} />} />
					<Route path="/Stats" element={<Stats questionList={(questions)} setQuestions={setQuestions} />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}
export default App;