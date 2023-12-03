import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getSelectedCharacterThunk, getUserCharactersThunk } from "../../store/characters";

import "./CharacterPage.css";

function CharacterPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const userCharacters = useSelector((state) => state.characters.userCharacters);

	useEffect(() => {
		dispatch(getUserCharactersThunk());
	}, [dispatch]);

	function selectCharacter(e) {
		console.log("test", e.target.innerHTML);
		const character_name = e.target.innerHTML;
		console.log("character_name", character_name);
		dispatch(getSelectedCharacterThunk(character_name));
	}

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="character-page-container">
				<div className="left-char-page">
					<p className="select-text">Select a Character</p>
					{userCharacters &&
						userCharacters.map((character) => (
							<button key="character" className="character-select-option" onClick={selectCharacter}>
								{character.character_name}
							</button>
						))}
				</div>
				<div className="right-char-page">Right</div>
			</div>
		</>
	);
}

export default CharacterPage;

/* <button className="character-select-option">Select A Character</button>
					<button className="character-select-create">+ new character</button>
					<button className="character-select-gear">Gear</button> */
