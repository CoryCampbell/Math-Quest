import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getSelectedCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import "./VillagePage.css";

function VillagePage() {
	const dispatch = useDispatch();

	const sessionUser = useSelector((state) => state.session.user);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);

	useEffect(() => {
		dispatch(getUserCharactersThunk());
		dispatch(getSelectedCharacterThunk());
	}, [dispatch]);

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			{selectedCharacter ? (
				<div className="village-page-container">
					<h1>Village</h1>
					<div className="subtitle-container">
						<NavLink to="/characters">Characters</NavLink>
						<NavLink to="/shop">Shop</NavLink>
						<NavLink to="/adventures">Adventures</NavLink>
					</div>
					<div className="village-options-container">
						<div className="village-option"></div>
						<div className="village-option"></div>
						<div className="village-option">
							<div className="adventure-options-container"></div>
						</div>
					</div>
				</div>
			) : (
				<>
					<div className="village-page-container">
						<h1>Village</h1>
						<div className="subtitle-container">
							<NavLink to="/characters">Characters</NavLink>
							<NavLink to="/shop">Shop</NavLink>
							<NavLink to="/adventures">Adventures</NavLink>
						</div>
						<div className="village-options-container">
							<div className="village-option">Select Your Character!</div>
							<div className="village-option">Shop Is Closed. Please Select A Character And Return Later!</div>
							<div className="village-option">
								Adventures need Heroes. Please Select A Character To Start An Adventure!
								<div className="adventure-options-container"></div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default VillagePage;
