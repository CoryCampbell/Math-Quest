import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./StatisticsPage.css";

function StatisticsPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;
	return (
		<>
			<div className="stats-page-container">
				<h1>Statistics Coming Soon!</h1>
			</div>
		</>
	);
}

export default StatisticsPage;
