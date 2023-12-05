import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import "./DeleteCharacterModal.css";

function DeleteCharacterModal() {
	// const user_id = useSelector((state) => state.session.user.id);
	const userCharacters = useSelector((state) => state.characters.userCharacters);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const characterName = localStorage.getItem("character_name");
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const deletedCharacter = await dispatch(deleteCharacterThunk(selectedCharacter));
		if (!Object.values(errors).length) {
			// const data = await dispatch(addNewCharacterThunk(characterName, appearance, user_id));
			// console.log("data", data);
			console.log("test");
			closeModal();
		} else return;
	};

	useEffect(() => {
		dispatch(getUserCharactersThunk());
	}, [dispatch]);

	return (
		<div className="delete-character-container">
			<h1>
				Are you sure you want to delete <b className="character-title-delete-modal">{characterName}</b>?
			</h1>
			<form className="submit-delete-character-container" onSubmit={handleSubmit}>
				<button className="delete-button" type="submit">
					YES
				</button>
				<button className="keep-button" onClick={closeModal}>
					NO
				</button>
			</form>
		</div>
	);
}

export default DeleteCharacterModal;
