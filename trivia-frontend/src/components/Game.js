import { useState } from "react";


function Game(props) {
	const [questions, setQuestions] = useState(props.questionList);

	return (
		<div>
			<h1>Welcome to Trivia.io!</h1>
		  {questions.map((question) => (
			<div key={question._id}>
			  <h2>{question.questionText}</h2>
				{question.options.map((option, index) => (
				  <button key={index}>{option}</button>
				))}
			</div>
		  ))}
		</div>
	  );

}
export default Game;
