import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
	const navigate = useNavigate();


	function navigateToGamePage() {
		navigate("/Game");
	}
    

	function navigateToStatsPage() {
		navigate("/Stats");
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
				<h1>Trivia.io</h1>
				<Button
					variant="primary"
					onClick={navigateToGamePage}
					style={{ margin: "auto", border: "2px solid black" }}
				>
					Play!
				</Button>
				<Button
					variant="primary"
					onClick={navigateToStatsPage}
					style={{
						margin: "auto",
						border: "2px solid black",
						marginTop: "10px",
						marginBottom: "10px",
					}}
				>
					View Stats
				</Button>
			</Card>
		</div>
	);
}

export default SplashScreen;