import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function Game(props) {
	const currentDate = new Date;
	const navigate = useNavigate();
	const singleDay = 24 * 60 * 60 * 1000;
	const [score, setScore] = useState(0);
	const [canPlay, setCanPlay] = useState(true);
	const lastAttempt = window.localStorage.getItem("LAST_PLAYED")
	const [questionsAnswered, setQuestionsAnswered] = useState(0);
	const [questions, setQuestions] = useState(props.questionList);
	const [numOfIncorrectAnswers, setNumOfIncorrectAnswers] = useState(0);
	const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
	
	
	useEffect(() => {
		shuffleQuestionArray();
	}, []);
	
	
	useEffect(() => {
		window.localStorage.setItem("SCORE", JSON.stringify(score));
		window.localStorage.setItem("NUMBER_OF_CORRECT_ANSWERS", JSON.stringify(numberOfCorrectAnswers));
		window.localStorage.setItem("NUMBER_OF_INCORRECT_ANSWERS",JSON.stringify(numOfIncorrectAnswers));
		window.localStorage.setItem("LAST_PLAYED", currentDate);
		
	}, [score, numberOfCorrectAnswers, numOfIncorrectAnswers]);
	
	
	useEffect(() => {
		const storedScore = localStorage.getItem("SCORE");
		const storedNumberOfCorrectAnswers = localStorage.getItem("NUMBER_OF_CORRECT_ANSWERS");
		const storedNumberOfIncorrectAnswers = localStorage.getItem("NUMBER_OF_INCORRECT_ANSWERS");
			
		if (storedScore !== null) {
			setScore(JSON.parse(storedScore));
		}
		
		if (storedNumberOfCorrectAnswers !== null) {
			setNumberOfCorrectAnswers(JSON.parse(storedNumberOfCorrectAnswers));
		}
		
		if (storedNumberOfIncorrectAnswers !== null) {
			setNumOfIncorrectAnswers(JSON.parse(storedNumberOfIncorrectAnswers));
		}

	}, []);

	// Checking to see if user can play again, if the days since the last attempt are less
	// than 1, the game will not be playable. 
	useEffect(() => {
		if (lastAttempt) {
		  const diff = new Date(currentDate) - new Date(lastAttempt);
		  const daysSinceLastAttempt = Math.floor(diff / singleDay);
		  
		  if (daysSinceLastAttempt < 1) {
			setCanPlay(false);
		  }
		}
	  }, []);

				
	function navigateToSplashScreen() {
		navigate("/");
	}
				
				
	function shuffleQuestionArray() {
		const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
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

	// If the user has played already, this screen will show them a message that
	// they have played previously, and to come back the next day to play again.
	if (!canPlay) {
		return (
			<div>
				<Card style={{
					marginTop: "15px",
					marginLeft: "50px",
					marginRight: "50px",
					border: "2px solid #011627",
					backgroundColor: "#495057",
				}}>
					<h1>Trivia.io</h1>
					<h6>Oh! It looks like you've met your question quota for today. Come back tomorrow to see what else you know!</h6>
				</Card>
				<Button
					style={{ marginTop: "10px", border: "2px solid black" }}
					variant="danger"
					onClick={() => navigateToSplashScreen()}
				>
					Exit
				</Button>
			</div>
		);
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
					<h1>Trivia.io</h1>
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
							<h2>Final Score: {score}/5</h2>
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