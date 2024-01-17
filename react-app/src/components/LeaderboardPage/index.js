import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LeaderboardPage.css";

function LeaderboardPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;
	return (
		<>
			<div className="leaderboard-page-container">
				<h1 className="leaderboard-title">Leaderboard (Coming Soon!)</h1>
				<div className="all-scores-container">
					<div className="adventures-leaderboard">
						<h2 className="al-title">Adventures</h2>
						<div>1 - 123123</div>
						<div>2 - 123123</div>
						<div>3 - 123123</div>
						<div>4 - 123123</div>
						<div>5 - 123123</div>
						<div>6 - 123123</div>
						<div>7 - 123123</div>
						<div>8 - 123123</div>
						<div>9 - 123123</div>
						<div>10 - 123123</div>
					</div>
					<div className="dungeons-leaderboard">
						<h2 className="dl-title">Dungeons</h2>
						<div>1 - 123123</div>
						<div>2 - 123123</div>
						<div>3 - 123123</div>
						<div>4 - 123123</div>
						<div>5 - 123123</div>
						<div>6 - 123123</div>
						<div>7 - 123123</div>
						<div>8 - 123123</div>
						<div>9 - 123123</div>
						<div>10 - 123123</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LeaderboardPage;
