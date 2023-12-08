import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./QuestsPage.css";

function QuestsPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;
	return (
		<>
			<div className="quests-page-container">
				<h1>Quests Coming Soon!</h1>
			</div>
		</>
	);
}

export default QuestsPage;
