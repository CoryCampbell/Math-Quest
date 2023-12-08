import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LandingPage.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function LandingPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (sessionUser) return <Redirect to="/village" />;

	return (
		<>
			<div className="landing-page-container">
				<h1>Welcome to MathQuest</h1>
				<p>Adventure Lies Ahead!</p>
				<div className="landing-page-details">
					<div className="landing-detail-one-container">
						<div className="detail-one-text">Solve Math Problems To Complete Adventures!</div>
					</div>
					<div className="landing-detail-two-container">
						<div className="detail-two-text">Gain Experience And Level Up Your Character!</div>
					</div>
					<div className="landing-detail-three-container">
						<div className="detail-three-text">Compete with Others For The #1 Spot On The Leaderboard!</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LandingPage;
