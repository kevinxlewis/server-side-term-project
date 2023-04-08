import { Router, Route } from "react-router-dom";
import history from "./components/history";

function Routes() {
	return (
		<Router history={history}>
			<Routes>
				<Route exact path="/Game"></Route>
			</Routes>
		</Router>
	);
}

export default Routes;
