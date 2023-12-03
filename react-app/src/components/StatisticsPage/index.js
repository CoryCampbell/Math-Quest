import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./StatisticsPage.css";

function StatisticsPage() {
	let sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;
	return (
		<>
			<div className="landing-page-container">Statistics Page</div>
		</>
	);
}

export default StatisticsPage;
