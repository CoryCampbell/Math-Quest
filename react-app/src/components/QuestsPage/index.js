import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./QuestsPage.css";

function QuestsPage() {
	let sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;
	return (
		<>
			<div className="landing-page-container">Quests Page</div>
		</>
	);
}

export default QuestsPage;
