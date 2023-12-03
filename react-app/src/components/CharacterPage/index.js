import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./CharacterPage.css";

function CharacterPage() {
	let sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="landing-page-container">Characters Page</div>
		</>
	);
}

export default CharacterPage;
