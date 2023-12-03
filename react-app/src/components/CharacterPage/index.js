import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./CharacterPage.css";

function CharacterPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="character-page-container">
				<div className="character-select-option">Select A Character</div>
				<div className="character-select-create">Create A Character</div>
				<div className="character-select-gear">Gear</div>
			</div>
		</>
	);
}

export default CharacterPage;
