import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSelectedCharacterThunk, getUserCharactersThunk } from "../../store/characters";
import { useEffect, useState } from "react";
import {
	addNewAdventureThunk,
	deleteAdventureThunk,
	getCurrentAdventureThunk,
	updateAdventureThunk
} from "../../store/adventures";

import AdventureStartModal from "../AlertModals/AdventureStartModal";
import OpenModalButton from "../OpenModalButton";
import easyQuestions from "../../static/math-questions";
import "./AdventurePage.css";

//

//

//

function AdventurePage() {
	const [passed, setPassed] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [rewardsClaimed, setRewardsClaimed] = useState(true);
	const history = useHistory();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const adventure = useSelector((state) => state.adventure);

	let currentAdventure = localStorage.getItem("adventure") || {};
	let currentQuestion = localStorage.getItem("currentQuestion") || {};
	let currentProgress = localStorage.getItem("currentProgress") || {};
	console.log(
		"FIRST RENDER=======> ",
		"currentAdventure: ",
		currentAdventure,
		"currentQuestion: ",
		currentQuestion,
		"currentProgress: ",
		currentProgress
	);

	//Protects page rendering from missing currentProgress
	if (Object.values(currentProgress) === 0) {
		console.log("no current progress to show");
		currentProgress = {};
	} else {
		try {
			console.log("parsing current progress: ", currentProgress);
			currentProgress = JSON.parse(currentProgress);
		} catch {
			console.log("not able to parse current progress", currentProgress);
			currentProgress = 1;
		}
	}

	const [currentStage, setCurrentStage] = useState(currentProgress);

	//Protects page rendering from missing question
	if (Object.values(currentQuestion) === 0) {
		console.log("X X X X X X ----> NO QUESTION FOUND");
		currentQuestion = loadQuestion(currentStage);
	} else {
		try {
			console.log("parsing currentQuestion: ", currentQuestion);
			currentQuestion = JSON.parse(currentQuestion);
		} catch {
			console.log("not able to parse currentQuestion");
			currentQuestion = {};
		}
	}

	//Protects page rendering from missing currentAdventure
	if (Object.values(currentAdventure) === 0) {
		console.log("no currnetAdventure chosen");
		currentAdventure = {};
	} else {
		try {
			console.log("parsing currentAdventure: ", currentAdventure);
			currentAdventure = JSON.parse(currentAdventure);
		} catch {
			console.log("not able to parse currentAdventure");
			currentAdventure = {};
		}
	}

	useEffect(() => {
		dispatch(getUserCharactersThunk());
		dispatch(getSelectedCharacterThunk());
		// dispatch(getCurrentAdventureThunk(selectedCharacter?.id));
	}, [dispatch]);

	if (!sessionUser) return <Redirect to="/" />;

	function startAdventure(e) {
		e.preventDefault();
		const adventure_type = e.target.value;
		dispatch(addNewAdventureThunk(selectedCharacter?.id, adventure_type));
		console.log("--------------STARTING ADVENTURE--------------");
		console.log("--------------STARTING ADVENTURE--------------");
		console.log("--------------STARTING ADVENTURE--------------");
		//clear any residual data from previous adventures
		e.preventDefault();
		console.log("currentStage should be 1", currentStage);

		//create progress tracker for local storage
		localStorage.setItem("currentProgress", 1);

		console.log("--------------adventure.id----->", adventure.id);
		//create adventure object shell that will eventually be added to db
		let adventureObject = {};
		adventureObject.adventure_type = adventure_type;
		adventureObject.character_id = selectedCharacter.id;
		adventureObject.score = 0;
		adventureObject.id = adventure.id;
		adventureObject.completed = false;

		console.log("storing start of adventure in local storage", adventureObject);
		localStorage.setItem("adventure", JSON.stringify(adventureObject));

		currentAdventure = JSON.parse(localStorage.getItem("adventure"));
		console.log("adventure after grab from local storage start adventure click: ", currentAdventure);

		currentQuestion = loadQuestion(currentStage - 1);
		console.log("currentQuestion ===========> should be first question", currentQuestion);
	}

	function loadQuestion(nextStage) {
		//get random question from list ---OLD VERSION
		// Change this to a function that grabs a random question
		// const randomInt = Math.floor(Math.random() * 4);
		// console.log("randomInt ==========> !!!!!!!!!!", randomInt);
		// let question = easyQuestions[randomInt];
		// console.log("question", question);
		// localStorage.setItem("currentQuestion", JSON.stringify(question));
		// return question;

		console.log("loading question #", nextStage);
		let question = easyQuestions.easySet1[nextStage];
		localStorage.setItem("currentQuestion", JSON.stringify(question));
		return question;
	}

	function usePotion(e) {
		e.preventDefault();
		alert("Feature coming soon!");

		//remove potion from inventory

		//update user HP
	}

	function runAway(e) {
		e.preventDefault();
		// alert("Feature coming soon!");

		//remove adventure from database
		dispatch(deleteAdventureThunk(adventure.id));

		//remove adventure from local storage
		localStorage.removeItem("adventure");
		localStorage.removeItem("currentQuestion");
		localStorage.removeItem("currentProgress");

		//redirect to village page
		history.push("/village");
	}

	function submitAnswer(e) {
		e.preventDefault();
		let question = JSON.parse(localStorage.getItem("currentQuestion"));
		let adventure = JSON.parse(localStorage.getItem("adventure"));
		console.log(" current question: ", question);
		console.log("submitted answer: ", e.target.value);
		console.log("correct answer: ", question.answer);

		//handle correct answer updates
		if (parseInt(e.target.value) === question.answer) {
			console.log("CORRECT ANSWER!");
			setPassed(true);

			//update score value
			adventure.score = adventure.score + question.question_value;
			console.log("new score value: ", adventure);
			localStorage.setItem("adventure", JSON.stringify(adventure));
		}

		//handle incorrect answer updates
		if (parseInt(e.target.value) !== question.answer) {
			console.log("INCORRECT ANSWER!");
			setPassed(false);
		}

		//deal damage or take damage based off of passed value
		if (passed) {
			//deal damage
			//give score points
		} else {
			//take damage
		}

		//update adventure progress
		//check to make sure stage can be advanced first
		//reload another question and update the local storage value
		if (currentStage + 1 > 10) {
			//end the adventure and update page
			console.log("adventure is over!", currentAdventure);

			//update adventure info in database
			console.log(adventure.id, adventure.score);
			dispatch(updateAdventureThunk(adventure.id, adventure.score));
			dispatch(getCurrentAdventureThunk(selectedCharacter.id));

			setCompleted(true);
			setRewardsClaimed(false);

			return;
		} else {
			//advance to next stage
			localStorage.removeItem("currentQuestion");
			localStorage.removeItem("currentProgress");
			const nextStage = currentStage + 1;
			console.log("Advancing to the next stage: ", nextStage);
			setCurrentStage(nextStage);
			question = loadQuestion(nextStage - 1);
			localStorage.setItem("currentQuestion", JSON.stringify(question));
			localStorage.setItem("currentProgress", JSON.stringify(nextStage));
		}

		// otherwise end adventure and update the adventure database as well as update coins/xp
	}

	function claimRewards(e) {
		e.preventDefault();
		// recieve rewards/experience points
		//update the adveture object to represent total score/coins/experience points
		//add that adventure object to the database

		//update setStates to render the home adventure page again
		setCompleted(false);
		setRewardsClaimed(true);
		setCurrentStage(1);

		localStorage.removeItem("adventure");
		localStorage.removeItem("currentQuestion");
		localStorage.removeItem("currentProgress");
	}

	// THREE STATES YOU CAN BE IN:
	// 1: NO SELECTED CHARACTER
	// 2: SELECTED CHARACTER BUT NO ADVENTURE STARTED
	// 3: SELECTED CHARACTER ***AND*** ADVENTURE STARTED
	return (
		<>
			{!selectedCharacter && rewardsClaimed && parseInt(currentProgress) !== 10 ? (
				<div className="no-character-adv-page">
					<div>Please Select A Character To Start A New Adventure!</div>
					<NavLink to="/characters">Characters</NavLink>
				</div>
			) : (
				<>
					{selectedCharacter && Object.keys(currentAdventure).length === 0 ? (
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
							{completed === false && rewardsClaimed ? (
								<div className="current-adventure-container">
									<div className="adventure-info-container">
										<div className="adv-top-left">
											<div>{selectedCharacter?.character_name}</div>
											<div>
												<div>
													❤{selectedCharacter?.current_health} / {selectedCharacter?.max_health}
												</div>
											</div>
										</div>
										<div className="help-button-container">
											<OpenModalButton
												buttonText="?"
												modalComponent={<AdventureStartModal className="adventure-start-help-button" />}
											></OpenModalButton>
										</div>
										<div className="adv-top-right">
											<div>Coins: {selectedCharacter?.coins}</div>
											<div>
												level {selectedCharacter?.level} XP: {selectedCharacter?.experience_points}
											</div>
										</div>
									</div>
									<div className="full-game-container">
										<div className="stage-time-container">
											<button className="use-potion-button" onClick={usePotion}>
												Use Potion
											</button>
											<div>Score: {currentAdventure["score"]}</div>
											<div>Stage: {currentStage} / 10</div>
											<button className="run-away-button" value={adventure?.id} onClick={runAway}>
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
							) : (
								<div className="end-of-adventure-container">
									<p>adventure ended</p>
									<p>score</p>
									<p>experience gained</p>
									<button className="rewards-button" onClick={claimRewards}>
										Claim Rewards!
									</button>
								</div>
							)}
							<div className="spacer-div"></div>
						</>
					)}
				</>
			)}
		</>
	);
}

export default AdventurePage;
