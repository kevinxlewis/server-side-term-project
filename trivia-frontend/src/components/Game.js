import { useState } from "react";
import Button from 'react-bootstrap/Button';

function Game(props) {
	const [questions, setQuestions] = useState(props.questionList);
	const [score, setScore] = useState(0);

	console.log()


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

	const questionOptionChosen = () => {
		if(questions.option == questions.correctAnswerIndex) {
			setScore(score + 1); 
		 	console.log("you got it right!")
		}
		console.log("Click")
	}


	return (
		<div>
			<h1>Welcome to Trivia.io!</h1>
			<h4>Answer these 5 questions to complete the game!</h4>
			<h2>Score: {score}</h2>
			{questions.slice(0, 1).map((question) => (
				<div key={question._id}>
				<h3>{question.questionText}</h3>
						{question.options.map((option, index) => (
							<Button  class="buttons" variant="dark" onClick={() => questionOptionChosen(questions.correctAnswerIndex)} key={index}>{option}</Button>
						))}
				</div>
		 	))}
		</div>
	);

}
export default Game;
