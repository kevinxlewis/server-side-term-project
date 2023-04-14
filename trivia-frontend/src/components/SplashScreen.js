import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

function SplashScreen() {

    const navigate = useNavigate();

	const navigateToGamePage = () => {
		navigate("/Game");
	};

    return (
    <div>
        <h1>Trivia.io</h1>
        <Button variant="success" onClick={navigateToGamePage}>Play!</Button>
    </div>
    )
}

export default SplashScreen; 