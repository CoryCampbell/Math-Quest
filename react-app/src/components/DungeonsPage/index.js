import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./DungeonsPage.css";

function DungeonsPage() {
	let sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="landing-page-container">Dungeons Coming Soon.</div>
		</>
	);
}

export default DungeonsPage;
