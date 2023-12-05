import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { getUserCharactersThunk, updateCharacterThunk } from "../../store/characters";
import "./UpdateCharacterNameModal.css";
import DeleteCharacterModal from "../DeleteCharacterModal";
import OpenModalButton from "../OpenModalButton";

function UpdateCharacterModal() {
	// const user_id = useSelector((state) => state.session.user.id);
	const userCharacters = useSelector((state) => state.characters.userCharacters);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const oldCharacterName = selectedCharacter.character_name;

	const dispatch = useDispatch();
	const [newCharacterName, setNewCharacterName] = useState(oldCharacterName);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("===========> oldCharacterName, newCharacterName", oldCharacterName, newCharacterName);
		const updatedCharacter = await dispatch(updateCharacterThunk(oldCharacterName, newCharacterName));
		localStorage.setItem("character_name", newCharacterName);
		closeModal();
		return updatedCharacter;
	};

	function validateInput() {
		const errorsObj = {};

		if (!newCharacterName || !newCharacterName.length) errorsObj.characterName = "Please give your character a Name!";

		userCharacters.forEach((character) => {
			if (character.character_name === newCharacterName)
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
						<input type="text" value={newCharacterName} onChange={(e) => setNewCharacterName(e.target.value)} />
					</label>
				</div>
				<button className="update-button" type="submit" onClick={validateInput}>
					Update
				</button>
				<OpenModalButton
					buttonText="DELETE"
					modalComponent={
						<DeleteCharacterModal className="delete-character-modal" character_id={selectedCharacter.id} />
					}
				></OpenModalButton>
			</form>
		</div>
	);
}

export default UpdateCharacterModal;
