import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import "./NewCharacterModal.css";

function NewCharacterModal() {
	const user_id = useSelector((state) => state.session.user.id);
	const userCharacters = useSelector((state) => state.characters.userCharacters);
	const dispatch = useDispatch();
	const [characterName, setCharacterName] = useState("");
	const [appearance, setAppearance] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!Object.values(errors).length) {
			const data = await dispatch(addNewCharacterThunk(characterName, appearance, user_id));
			dispatch(getUserCharactersThunk());
			localStorage.setItem("character_name", characterName);
			closeModal();
			return data;
		} else return;
	};

	function validateInput() {
		const errorsObj = {};
		const forbiddenSymbols = "/|-!?)(*&^%$#><:~`'@=+";

		function forbiddenLoop(name) {
			for (let i = 0; i < name.length; i++) {
				const char = name[i];

				if (forbiddenSymbols.includes(char)) {
					return true;
				}
			}
			return false;
		}

		if (!characterName || !characterName.trim().length) errorsObj.characterName = "Please give your character a Name!";

		if (forbiddenLoop(characterName))
			errorsObj.characterName = "Names are not allowed to include any Symbols or Special Characters!";

		if (localStorage.getItem("currentAdventure"))
			errorsObj.adventure = "Please end your current adventure before creating a new Character!";

		if (!appearance) errorsObj.appearance = "Please give your character an appearance!";

		userCharacters.forEach((character) => {
			if (character.character_name === characterName)
				errorsObj.characterName = "You already have a character with that name!";
		});

		setErrors(errorsObj);
		return;
	}

	return (
		<div className="create-character-container">
			<h1>Create a New Character!</h1>
			<form className="create-new-character-form" onSubmit={handleSubmit}>
				<div className="name-input-row">
					{errors.characterName && <p className="errors characterNameError">{errors.characterName}</p>}
					{errors.adventure && <p className="errors adventureError">{errors.adventure}</p>}
					<label>
						Name:
						<input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
					</label>
				</div>
				<div className="appearance-select-container">
					{errors.appearance && <p className="errors appearanceError">{errors.appearance}</p>}
					<fieldset className="appearance-options-view">
						<legend>Select an appearance:</legend>

						<div>
							<input type="radio" id={1} name="drone" value={appearance} onChange={(e) => setAppearance(e.target.id)} />
							<label htmlFor="appearance-one">
								<img src={require("../../static/appearances/female-one.png").default} alt="Female1"></img>
							</label>
						</div>

						<div>
							<input type="radio" id={2} name="drone" value={appearance} onChange={(e) => setAppearance(e.target.id)} />
							<label htmlFor="appearance-two">
								<img src={require("../../static/appearances/FEMALE2.PNG").default} alt="Female2"></img>
							</label>
						</div>

						<div>
							<input type="radio" id={3} name="drone" value={appearance} onChange={(e) => setAppearance(e.target.id)} />
							<label htmlFor="appearance-three">
								<img src={require("../../static/appearances/FEMALE3.PNG").default} alt="Female1"></img>
							</label>
						</div>

						<div>
							<input type="radio" id={4} name="drone" value={appearance} onChange={(e) => setAppearance(e.target.id)} />
							<label htmlFor="appearance-four">
								<img src={require("../../static/appearances/FEMALE4.PNG").default} alt="Female1"></img>
							</label>
						</div>
					</fieldset>
					<button className="create-char-button" type="submit" onClick={validateInput}>
						Create
					</button>
				</div>
			</form>
		</div>
	);
}

export default NewCharacterModal;
