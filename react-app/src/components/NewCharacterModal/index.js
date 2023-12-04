import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addNewCharacterThunk } from "../../store/characters";
// import "./LoginForm.css";

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

		userCharacters.forEach((character) => {
			if (character.character_name === characterName) setErrors(["You already have a character with that name!"]);
		});

		const data = await dispatch(addNewCharacterThunk(characterName, appearance, user_id));

		console.log("=================>data", data);

		if (data) {
			setErrors(data);
			console.log("errors", errors);
		} else {
			closeModal();
		}
	};

	return (
		<div className="create-character-container">
			<h1>Create a New Character!</h1>
			<form className="user-input-container" onSubmit={handleSubmit}>
				<ul>
					{/* {errors?.map((error, idx) => (
						<li key={idx}>{error}</li>
					))} */}
				</ul>
				<div className="name-input-row">
					<label>
						Name:
						<input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} required />
					</label>
				</div>
				<div className="appearance-input-row"></div>
				<fieldset>
					<legend>Select an appearance:</legend>

					<div>
						<input
							type="radio"
							id={1}
							name="drone"
							value={appearance}
							onChange={(e) => setAppearance(e.target.id)}
							required
						/>
						<label htmlFor="appearance-one">Appearance One</label>
					</div>

					<div>
						<input
							type="radio"
							id={2}
							name="drone"
							value={appearance}
							onChange={(e) => setAppearance(e.target.id)}
							required
						/>
						<label htmlFor="appearance-two">Appearance Two</label>
					</div>

					<div>
						<input
							type="radio"
							id={3}
							name="drone"
							value={appearance}
							onChange={(e) => setAppearance(e.target.id)}
							required
						/>
						<label htmlFor="appearance-three">Appearance Three</label>
					</div>

					<div>
						<input
							type="radio"
							id={4}
							name="drone"
							value={appearance}
							onChange={(e) => setAppearance(e.target.id)}
							required
						/>
						<label htmlFor="appearance-four">Appearance Four</label>
					</div>
				</fieldset>
				<button className="login-button" type="submit">
					Create
				</button>
			</form>
		</div>
	);
}

export default NewCharacterModal;
