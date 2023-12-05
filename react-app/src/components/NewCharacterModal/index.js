import React, { useEffect, useState } from "react";
import { login } from "../../store/session";
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

			console.log("data", data);
			closeModal();
		}
		// else return errors;
	};

	function validateInput() {
		const errorsObj = {};

		if (!characterName || !characterName.length) errorsObj.characterName = "Please give your character a Name!";
		if (!appearance) errorsObj.appearance = "Please give your character an appearance!";

		userCharacters.forEach((character) => {
			if (character.character_name === characterName)
				errorsObj.characterName = "You already have a character with that name!";
		});

		setErrors(errorsObj);
		return;
	}

	useEffect(() => {
		dispatch(getUserCharactersThunk());
	}, [dispatch]);

	return (
		<div className="create-character-container">
			<h1>Create a New Character!</h1>
			<form className="user-input-container" onSubmit={handleSubmit}>
				<ul></ul>
				<div className="name-input-row">
					{errors.characterName && <p className="errors characterNameError">{errors.characterName}</p>}
					<label>
						Name:
						<input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
					</label>
				</div>
				<div className="appearance-input-row"></div>
				{errors.appearance && <p className="errors appearanceError">{errors.appearance}</p>}
				<fieldset>
					<legend>Select an appearance:</legend>

					<div>
						<input type="radio" id={1} name="drone" value={appearance} onChange={(e) => setAppearance(e.target.id)} />
						<label htmlFor="appearance-one">Appearance One</label>
					</div>

					<div>
						<input type="radio" id={2} name="drone" value={appearance} onChange={(e) => setAppearance(e.target.id)} />
						<label htmlFor="appearance-two">Appearance Two</label>
					</div>

					<div>
						<input type="radio" id={3} name="drone" value={appearance} onChange={(e) => setAppearance(e.target.id)} />
						<label htmlFor="appearance-three">Appearance Three</label>
					</div>

					<div>
						<input type="radio" id={4} name="drone" value={appearance} onChange={(e) => setAppearance(e.target.id)} />
						<label htmlFor="appearance-four">Appearance Four</label>
					</div>
				</fieldset>
				<button className="login-button" type="submit" onClick={validateInput}>
					Create
				</button>
			</form>
		</div>
	);
}

export default NewCharacterModal;
