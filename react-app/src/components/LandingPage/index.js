import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LandingPage.css";

function LandingPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (sessionUser) return <Redirect to="/village" />;

	return (
		<>
			<div className="landing-page-container">Welcome to MathQuest</div>
		</>
	);
}

export default LandingPage;
