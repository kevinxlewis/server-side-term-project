import { useState } from "react";

function Game(props) {
	const [questions, setQuestions] = useState(props.questionList);


	/*
	Method to randomize and shuffle question array.
	Generates random index between 0 and the max index of the question array and randomizes its order.
	*/
	function shuffleQuestionArray() {
		let len = questions.length, currentIndex; 

		for(currentIndex = len - 1; currentIndex > 0; currentIndex--) {
			let randomIndex = Math.floor(Math.random() * (currentIndex + 1)); 
			let tempIndex = questions[currentIndex]; 
			questions[currentIndex] = questions[randomIndex]; 
			questions[randomIndex] = tempIndex; 
		}
	}
	shuffleQuestionArray();


	return (
		<div>
			<h1>Welcome to Trivia.io!</h1>
			{questions.slice(0, 5).map((question) => (
			<div key={question._id}>
			  <h3>{question.questionText}</h3>
				{question.options.map((option, index) => (
				  <button key={index}>{option}</button>
				))}
			</div>
		  ))}
		</div>
	);

}
export default Game;
