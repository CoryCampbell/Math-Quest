import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./DungeonsPage.css";

function DungeonsPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="dungeons-page-container">
				<h1>Dungeons Coming Soon!</h1>
			</div>
		</>
	);
}

export default DungeonsPage;
