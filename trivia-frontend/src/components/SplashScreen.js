import { useNavigate } from "react-router-dom";

function SplashScreen() {

    const navigate = useNavigate();

	const navigateToGamePage = () => {
		navigate("/Game");
	};

    return (
    <div>
        <h1>Trivia.io</h1>
        <button onClick={navigateToGamePage}>Play!</button>
    </div>
    )
}

export default SplashScreen; 