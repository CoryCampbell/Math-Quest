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
					<div className="village-options-container">
						<button className="village-option">
							<p>Live!</p>
							<NavLink to="/shop">Shop</NavLink>
						</button>

						<button className="village-character-option">
							<p>Live!</p>
							<p>*image will go here*</p>
							<NavLink to="/characters">Characters</NavLink>
						</button>
						<button className="village-option">
							<p>Live!</p>
							<NavLink to="/adventures">Adventures</NavLink>
						</button>
					</div>
				</div>
			) : (
				<>
					<div className="village-page-container">
						<h1>Village</h1>
						<div className="village-options-container">
							<button className="village-option-closed" disabled>
								<p>Shop Is Closed. Please Select A Character And Return Later!</p>
								<p className="x">X</p>
							</button>

							<button className="village-character-option">
								<p>Choose A Character To Start Your Journey!</p>
								<p>*image will go here*</p>
								<NavLink to="/characters">Characters</NavLink>
							</button>
							<button className="village-option-closed" disabled>
								<p>Adventures need Heroes. Please Select A Character To Start An Adventure!</p>
								<p className="x">X</p>
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default VillagePage;
