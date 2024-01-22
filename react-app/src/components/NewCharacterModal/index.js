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

		if (localStorage.getItem("currentAdventure")) {
			errorsObj.adventure = "Finish your adventure before creating a Character!";
		} else {
			if (!characterName || !characterName.trim().length)
				errorsObj.characterName = "Please give your character a Name!";

			if (characterName.length > 22) errorsObj.nameLength = "Names are not allowed to be longer than 22 characters!";

			if (forbiddenLoop(characterName))
				errorsObj.characterName = "Names are not allowed to include any Symbols or Special Characters!";

			if (!appearance) errorsObj.appearance = "Please give your character an appearance!";

			userCharacters.forEach((character) => {
				if (character.character_name === characterName)
					errorsObj.characterName = "You already have a character with that name!";
			});
		}

		setErrors(errorsObj);
		return;
	}

	return (
		<div className="create-character-container">
			<h1>Create a New Character!</h1>
			<form className="create-new-character-form" onSubmit={handleSubmit}>
				<div className="name-input-row">
					{errors.characterName && <p className="errors characterNameError">{errors.characterName}</p>}
					{errors.nameLength && <p className="errors nameLengthError">{errors.nameLength}</p>}
					{errors.adventure && <p className="errors adventureError">{errors.adventure}</p>}
					<label>
						<p>Character Name</p>
						<input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
					</label>
				</div>
				<div className="appearance-select-container">
					{errors.appearance && <p className="errors appearanceError">{errors.appearance}</p>}
					<fieldset className="appearance-options-view">
						<label>Choose Your Character</label>

						<div className="boys-select-container">
							<div>
								<input
									type="radio"
									id={1}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-m1">
									<img src={require("../../static/appearances/MALE1.PNG").default} alt="Male1"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={3}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-m2">
									<img src={require("../../static/appearances/MALE2.PNG").default} alt="Male2"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={5}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-m3">
									<img src={require("../../static/appearances/MALE3.PNG").default} alt="Male3"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={7}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-m4">
									<img src={require("../../static/appearances/MALE4.PNG").default} alt="Male4"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={9}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-m5">
									<img src={require("../../static/appearances/MALE5.PNG").default} alt="Male5"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={11}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-m6">
									<img src={require("../../static/appearances/MALE6.PNG").default} alt="Male6"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={13}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-m7">
									<img src={require("../../static/appearances/MALE7.PNG").default} alt="Male7"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={15}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-m8">
									<img src={require("../../static/appearances/MALE8.PNG").default} alt="Male8"></img>
								</label>
							</div>
						</div>
						<div className="girls-select-container">
							<div>
								<input
									type="radio"
									id={2}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-f1">
									<img src={require("../../static/appearances/FEMALE1.PNG").default} alt="Female1"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={4}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-f2">
									<img src={require("../../static/appearances/FEMALE2.PNG").default} alt="Female2"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={6}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-f3">
									<img src={require("../../static/appearances/FEMALE3.PNG").default} alt="Female3"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={8}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-f4">
									<img src={require("../../static/appearances/FEMALE4.PNG").default} alt="Female4"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={16}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-f8">
									<img src={require("../../static/appearances/FEMALE8.PNG").default} alt="Female8"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={10}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-f5">
									<img src={require("../../static/appearances/FEMALE5.PNG").default} alt="Female5"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={14}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-f7">
									<img src={require("../../static/appearances/FEMALE7.PNG").default} alt="Female7"></img>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id={12}
									name="drone"
									value={appearance}
									onChange={(e) => setAppearance(e.target.id)}
								/>
								<label htmlFor="appearance-f6">
									<img src={require("../../static/appearances/FEMALE6.PNG").default} alt="Female6"></img>
								</label>
							</div>
						</div>
					</fieldset>
					<div className="create-char-button-container">
						<button className="create-char-button" type="submit" onClick={validateInput}>
							Create
						</button>
						<button className="cancel-char-button" type="button" onClick={closeModal}>
							Cancel
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default NewCharacterModal;
