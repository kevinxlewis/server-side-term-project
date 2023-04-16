import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function Stats() {
	const navigate = useNavigate();


	function navigateToSplashScreen() {
		navigate("/");
	}

	return (
		<>
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
					<h2>Player Stats</h2>
				</Card.Title>
				<Card.Body>
					<Card.Text>
						<h4>
							Here you'll find your stats from playing Trivia.io
						</h4>
						<br></br>
						<h4>Score: {localStorage.getItem("SCORE")}</h4>
						<h4>
							Correct Answers:{" "}
							{localStorage.getItem("NUMBER_OF_CORRECT_ANSWERS")}
						</h4>
						<h4>
							Incorrect Answers:{" "}
							{localStorage.getItem(
								"NUMBER_OF_INCORRECT_ANSWERS"
							)}
						</h4>
					</Card.Text>
				</Card.Body>
			</Card>
			<Button
				style={{ marginTop: "10px", border: "2px solid black" }}
				onClick={() => navigateToSplashScreen()}
				variant="danger"
			>
				Back
			</Button>
		</>
	);
}
export default Stats;