import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getUserCharactersThunk } from "../../store/characters";
import "./UpdateCharacterNameModal.css";

function UpdateCharacterModal() {
	// const user_id = useSelector((state) => state.session.user.id);
	const userCharacters = useSelector((state) => state.characters.userCharacters);

	const dispatch = useDispatch();
	const [characterName, setCharacterName] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!Object.values(errors).length) {
			//if everything is good, update the characters name here:
			//UPDATE NAME
			//
			closeModal();
		} else return;
	};

	function validateInput() {
		const errorsObj = {};

		if (!characterName || !characterName.length) errorsObj.characterName = "Please give your character a Name!";

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
		<div className="update-character-container">
			<h1>Update Your Character's Name!</h1>
			<form className="user-input-container" onSubmit={handleSubmit}>
				<ul></ul>
				<div className="name-input-row">
					{errors.characterName && <p className="errors characterNameError">{errors.characterName}</p>}
					<label>
						Name:
						<input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
					</label>
				</div>
				<button className="update-button" type="submit" onClick={validateInput}>
					Update
				</button>
			</form>
		</div>
	);
}

export default UpdateCharacterModal;
