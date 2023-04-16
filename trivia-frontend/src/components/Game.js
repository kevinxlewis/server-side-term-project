import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function Game(props) {
	const navigate = useNavigate();
	const [score, setScore] = useState(0);
	const [questionsAnswered, setQuestionsAnswered] = useState(0);
	const [questions, setQuestions] = useState(props.questionList);
	const [numOfIncorrectAnswers, setNumOfIncorrectAnswers] = useState(0);
	const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

	useEffect(() => {
		shuffleQuestionArray();
	}, []);


	//TODO => need to fix this so that localStorage values DON'T reset after a re-render.
	useEffect(() => {
		window.localStorage.setItem("SCORE", JSON.stringify(score));
		window.localStorage.setItem("NUMBER_OF_CORRECT_ANSWERS", JSON.stringify(numberOfCorrectAnswers));
		localStorage.setItem("NUMBER_OF_INCORRECT_ANSWERS",JSON.stringify(numOfIncorrectAnswers));
	}, [score, numberOfCorrectAnswers, numOfIncorrectAnswers]);


	useEffect(() => {
		const storedScore = localStorage.getItem("SCORE");
		const storedNumberOfCorrectAnswers = localStorage.getItem(
			"NUMBER_OF_CORRECT_ANSWERS"
		);
		const storedNumberOfIncorrectAnswers = localStorage.getItem(
			"NUMBER_OF_INCORRECT_ANSWERS"
		);

		if (storedScore !== null) {
			setScore(JSON.parse(storedScore));
		}

		if (storedNumberOfCorrectAnswers !== null) {
			setNumberOfCorrectAnswers(JSON.parse(storedNumberOfCorrectAnswers));
		}

		if (storedNumberOfIncorrectAnswers !== null) {
			setNumOfIncorrectAnswers(
				JSON.parse(storedNumberOfIncorrectAnswers)
			);
		}
	}, []);


	function navigateToSplashScreen() {
		navigate("/");
	}


	function shuffleQuestionArray() {
		const shuffledQuestions = [...questions].sort(
			() => Math.random() - 0.5
		);
		setQuestions(shuffledQuestions);
	}


	function handleQuestionAnswer(isCorrect) {
		const currentQuestion = questions[0];

		if (isCorrect === currentQuestion.options[currentQuestion.correctAnswerIndex]) {
			setScore(score + 1);
			setNumberOfCorrectAnswers(numberOfCorrectAnswers + 1);
		} 
		else {
			setNumOfIncorrectAnswers(numOfIncorrectAnswers + 1);
		}

		setQuestions(questions.slice(1));
		setQuestionsAnswered(questionsAnswered + 1);
	}

	return (
		<div>
			<Card
				style={{
					marginTop: "15px",
					marginLeft: "50px",
					marginRight: "50px",
					border: "2px solid #011627",
					backgroundColor: "#495057",
				}}
			>
				<Card.Title>
					<h1>Welcome to Trivia.io!</h1>
				</Card.Title>
				<Card.Text>
					{questionsAnswered < 5 ? (
						<div>
							<h5>Answer all the questions to complete</h5>
							<br></br>
							{questions.length > 0 && (
								<div key={questions[0]._id}>
									<h3>{questions[0].questionText}</h3>
									{questions[0].options.map(
										(option, index) => (
											<ButtonGroup>

												<Button
													key={index}
													variant="dark"
													className="Buttons"
													onClick={() =>
														handleQuestionAnswer(option)
													}
													style={{
														marginTop: "10px",
														marginRight: "2px",
														marginLeft: "2px",
														border: "2px solid black",
													}}
												>
													{option}
												</Button>
											</ButtonGroup>
										)
									)}
									<h2>Score: {score}</h2>
								</div>
							)}
						</div>
					) : (
						<div>
							<h4>
								Congratulations, you have completed the game!
							</h4>
							<h2>Final Score: {score}</h2>
						</div>
					)}
				</Card.Text>
			</Card>

			<div>
				<Button
					style={{ marginTop: "10px", border: "2px solid black" }}
					variant="danger"
					onClick={() => navigateToSplashScreen()}
				>
					Exit
				</Button>
			</div>
		</div>
	);
}
export default Game;