import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./DungeonsPage.css";

function DungeonsPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="dungeons-page-container">Dungeons Coming Soon.</div>
		</>
	);
}

export default DungeonsPage;
