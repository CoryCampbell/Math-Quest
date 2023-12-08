import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSelectedCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import { useEffect } from "react";
import { addNewAdventureThunk, clearAdventureThunk } from "../../store/adventures";
import AdventureStartModal from "../AlertModals/AdventureStartModal";
import OpenModalButton from "../OpenModalButton";
import easyQuestions from "../../static/math-questions";
import "./AdventurePage.css";

function AdventurePage() {
	const history = useHistory();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	let currentAdventure = useSelector((state) => state.adventure);
	let adventure = localStorage.getItem("adventure") || {};
	let currentQuestion = localStorage.getItem("currentQuestion") || {};
	console.log("currentQuestion", currentQuestion);

	if (Object.values(currentQuestion) === 0) {
		console.log("X X X X X X ----> NO QUESTION FOUND");
		currentQuestion = loadQuestion();
	} else {
		try {
			console.log("parsing!!!", currentQuestion);
			currentQuestion = JSON.parse(currentQuestion);
		} catch {
			console.log("not able to parse!!!");
			currentQuestion = {};
		}
	}

	if (Object.values(adventure) === 0) {
		console.log("no adventure chosen");
		currentAdventure = {};
	} else {
		try {
			console.log("parsing!!!", adventure);
			currentAdventure = JSON.parse(adventure);
		} catch {
			console.log("not able to parse!!!");
			currentAdventure = {};
		}
	}

	useEffect(() => {
		dispatch(getUserCharactersThunk());
		dispatch(getSelectedCharacterThunk());
	}, [dispatch]);

	if (!sessionUser) return <Redirect to="/" />;

	function startAdventure(e) {
		e.preventDefault();
		let adventureObject = {};
		adventureObject.character_id = selectedCharacter.id;
		adventureObject.score = 0;
		adventureObject.progress = 0;
		adventureObject.adventure_type = e.target.value;
		adventureObject.completed = false;
		localStorage.setItem("adventure", JSON.stringify(adventureObject));
		adventure = JSON.parse(localStorage.getItem("adventure"));
		currentAdventure = adventure;
		console.log("adventure after grab from local storage start adventure click: ", currentAdventure);
		dispatch(addNewAdventureThunk(selectedCharacter?.id, currentAdventure.adventure_type));
		currentQuestion = loadQuestion();
		console.log("currentQuestion ===========>", currentQuestion);
	}

	function loadQuestion() {
		//get random question from list
		// Change this to a function that grabs a random question
		const randomInt = Math.floor(Math.random() * 4);
		console.log("randomInt ==========> !!!!!!!!!!", randomInt);
		let question = easyQuestions[randomInt];
		console.log("question", question);
		localStorage.setItem("currentQuestion", JSON.stringify(question));
		return question;
	}

	function usePotion() {
		alert("Feature coming soon!");

		//remove potion from inventory

		//update user HP
	}

	function runAway() {
		// alert("Feature coming soon!");

		//remove adventure from local storage
		localStorage.removeItem("adventure");

		//remove adventure from state
		dispatch(clearAdventureThunk());

		//redirect to village page
		history.push("/village");
	}

	function submitAnswer(e) {
		console.log(e.target.value);

		//check if submitted answer is correct

		//handle correct answer updates

		//handle incorrect answer updates

		//update adventure progress

		//reload another question
	}

	console.log("FINAL: currentQuestion: ", currentQuestion);
	// THREE STATES YOU CAN BE IN:
	// 1: NO SELECTED CHARACTER
	// 2: SELECTED CHARACTER BUT NO ADVENTURE STARTED
	// 3: SELECTED CHARACTER ***AND*** ADVENTURE STARTED
	return (
		<>
			{!selectedCharacter ? (
				<div className="no-character-adv-page">
					<div>Please Select A Character To Start A New Adventure!</div>
					<NavLink to="/characters">Characters</NavLink>
				</div>
			) : (
				<>
					{selectedCharacter && Object.keys(adventure).length === 0 ? (
						<div className="adventure-page-container">
							<div className="page-title">Select Your Adventure!</div>
							<div className="adventure-options-container">
								<button className="adventure-option add" value="addition" onClick={startAdventure}>
									Addition Adventure
								</button>
								<button className="adventure-option sub" disabled>
									Subtraction Adventure Coming Soon!
								</button>
								<button className="adventure-option mult" disabled>
									Multiplication Adventure Coming Soon!
								</button>
								<button className="adventure-option division" disabled>
									Division Adventure Coming Soon!
								</button>
							</div>
						</div>
					) : (
						<>
							<div className="current-adventure-container">
								<div className="adventure-info-container">
									<div className="adv-top-left">
										<div>{selectedCharacter.character_name}</div>
										<div>
											<div>
												❤{selectedCharacter.current_health} / {selectedCharacter.max_health}
											</div>
										</div>
									</div>
									<OpenModalButton
										buttonText="?"
										modalComponent={<AdventureStartModal className="adventure-start-help-button" />}
									></OpenModalButton>
									<div className="adv-top-right">
										<div>Coins: {selectedCharacter.coins}</div>
										<div>
											level {selectedCharacter.level} XP: {selectedCharacter.experience_points}
										</div>
									</div>
								</div>
								<div className="full-game-container">
									<div className="stage-time-container">
										<button className="use-potion-button" onClick={usePotion}>
											Use Potion
										</button>
										<div>Score: {currentAdventure["score"]}</div>
										<div>Stage: {currentAdventure["progress"] + 1} / 10</div>
										<button className="run-away-button" onClick={runAway}>
											Run Away!
										</button>
									</div>
									<div className="bottom-game-container">
										<div className="visual-game-container">
											<div className="player-icon icon">player icon</div>
											<div className="enemy-icon icon">enemy icon</div>
										</div>
										<div className="math-game-container">
											<div className="question-container">{currentQuestion?.question} = ?</div>
											<div className="answers-container">
												<button
													className="answer-one answer"
													value={currentQuestion?.choices[0]}
													onClick={submitAnswer}
												>
													{currentQuestion?.choices[0]}
												</button>
												<button
													className="answer-two answer"
													value={currentQuestion?.choices[1]}
													onClick={submitAnswer}
												>
													{currentQuestion?.choices[1]}
												</button>
												<button
													className="answer-three answer"
													value={currentQuestion?.choices[2]}
													onClick={submitAnswer}
												>
													{currentQuestion?.choices[2]}
												</button>
												<button
													className="answer-four answer"
													value={currentQuestion?.choices[3]}
													onClick={submitAnswer}
												>
													{currentQuestion?.choices[3]}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="spacer-div"></div>
						</>
					)}
				</>
			)}
		</>
	);
}

export default AdventurePage;
