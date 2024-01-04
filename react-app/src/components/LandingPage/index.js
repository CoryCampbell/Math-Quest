import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./LandingPage.css";

function LandingPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (sessionUser) return <Redirect to="/village" />;

	return (
		<>
			<div className="landing-page-container">
				<h1>Welcome to MathQuest</h1>

				<h4>"Mathematics is not a language. It's an adventure." - Paul Lockhart</h4>
				<div className="landing-page-details">
					<div className="prev-one">
						<img
							src={require("../../static/landing/adventure-preview.png").default}
							alt="adv-preview"
							className="adv-prev"
						></img>
						<div className="landing-detail-one-container">
							<div className="detail-one-text">Solve Math Problems To Complete Adventures!</div>
						</div>
					</div>
					<div className="prev-two">
						<img
							src={require("../../static/landing/characters-preview.png").default}
							alt="char-preview"
							className="char-prev"
						></img>
						<div className="landing-detail-two-container">
							<div className="detail-two-text">Gain Experience And Level Up Your Character!</div>
						</div>
					</div>

					<div className="prev-three">
						<img
							src={require("../../static/landing/village-preview.png").default}
							alt="village-preview"
							className="village-prev"
						></img>
						<div className="landing-detail-three-container">
							<div className="detail-three-text">Compete with Others For The #1 Spot On The Leaderboard!</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LandingPage;
