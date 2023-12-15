import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSelectedCharacterThunk, getUserCharactersThunk, updateExperienceThunk } from "../../store/characters";
import { useEffect, useState } from "react";
import { addNewAdventureThunk, deleteAdventureThunk } from "../../store/adventures";

import AdventureStartModal from "../AlertModals/AdventureStartModal";
import OpenModalButton from "../OpenModalButton";
import easyQuestions from "../../static/math-questions";
import "./AdventurePage.css";

//

//

//

function AdventurePage() {
	const [passed, setPassed] = useState(false);
	const [started, setStarted] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [rewardsClaimed, setRewardsClaimed] = useState(true);
	const history = useHistory();
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const adventure = useSelector((state) => state.adventure);
	const maleAppearance1 = require("../../static/appearances/MALE1.PNG");
	const maleAppearance2 = require("../../static/appearances/MALE2.PNG");
	const maleAppearance3 = require("../../static/appearances/MALE3.PNG");
	const maleAppearance4 = require("../../static/appearances/MALE4.PNG");
	const maleAppearance5 = require("../../static/appearances/MALE5.PNG");
	const maleAppearance6 = require("../../static/appearances/MALE6.PNG");
	const maleAppearance7 = require("../../static/appearances/MALE7.PNG");
	const maleAppearance8 = require("../../static/appearances/MALE8.PNG");

	const femaleAppearance1 = require("../../static/appearances/FEMALE1.PNG");
	const femaleAppearance2 = require("../../static/appearances/FEMALE2.PNG");
	const femaleAppearance3 = require("../../static/appearances/FEMALE3.PNG");
	const femaleAppearance4 = require("../../static/appearances/FEMALE4.PNG");
	const femaleAppearance5 = require("../../static/appearances/FEMALE5.PNG");
	const femaleAppearance6 = require("../../static/appearances/FEMALE6.PNG");
	const femaleAppearance7 = require("../../static/appearances/FEMALE7.PNG");
	const femaleAppearance8 = require("../../static/appearances/FEMALE8.PNG");

	let currentAdventure = localStorage.getItem("currentAdventure") || {};
	let currentQuestion = localStorage.getItem("currentQuestion") || {};
	let currentProgress = localStorage.getItem("currentProgress") || {};
	const appearance = selectedCharacter?.appearance;
	console.log("appearance--------> ", appearance);

	let imagePreview;

	if (appearance === 1) {
		imagePreview = maleAppearance1;
	} else if (appearance === 2) {
		imagePreview = femaleAppearance1;
	} else if (appearance === 3) {
		imagePreview = maleAppearance2;
	} else if (appearance === 4) {
		imagePreview = femaleAppearance2;
	} else if (appearance === 5) {
		imagePreview = maleAppearance3;
	} else if (appearance === 6) {
		imagePreview = femaleAppearance3;
	} else if (appearance === 7) {
		imagePreview = maleAppearance4;
	} else if (appearance === 8) {
		imagePreview = femaleAppearance4;
	} else if (appearance === 9) {
		imagePreview = maleAppearance5;
	} else if (appearance === 10) {
		imagePreview = femaleAppearance5;
	} else if (appearance === 11) {
		imagePreview = maleAppearance6;
	} else if (appearance === 12) {
		imagePreview = femaleAppearance6;
	} else if (appearance === 13) {
		imagePreview = maleAppearance7;
	} else if (appearance === 14) {
		imagePreview = femaleAppearance7;
	} else if (appearance === 15) {
		imagePreview = maleAppearance8;
	} else {
		imagePreview = femaleAppearance8;
	}

	//Protects page rendering from missing currentProgress
	if (Object.values(currentProgress) === 0) {
		currentProgress = {};
	} else {
		try {
			currentProgress = JSON.parse(currentProgress);
		} catch {
			currentProgress = 1;
		}
	}

	const [currentStage, setCurrentStage] = useState(currentProgress);

	//Protects page rendering from missing question
	if (Object.values(currentQuestion) === 0) {
		currentQuestion = loadQuestion(currentStage);
	} else {
		try {
			currentQuestion = JSON.parse(currentQuestion);
		} catch {
			currentQuestion = {};
		}
	}

	//Protects page rendering from missing currentAdventure
	if (Object.values(currentAdventure) === 0) {
		currentAdventure = {};
	} else {
		try {
			currentAdventure = JSON.parse(currentAdventure);
		} catch {
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
		setStarted(true);
		const adventure_type = e.target.value;
		console.log("--------------STARTING ADVENTURE--------------");
		console.log("--------------STARTING ADVENTURE--------------");
		console.log("--------------STARTING ADVENTURE--------------");
		//clear any residual data from previous adventures
		e.preventDefault();
		console.log("currentStage should be 1", currentStage);

		//create progress tracker for local storage
		localStorage.setItem("currentProgress", 1);

		//create adventure object shell that will eventually be added to db
		let adventureObject = {};
		adventureObject.adventure_type = adventure_type;
		adventureObject.character_id = selectedCharacter.id;
		adventureObject.score = 0;
		adventureObject.completed = false;

		console.log("storing start of adventure in local storage", adventureObject);
		localStorage.setItem("currentAdventure", JSON.stringify(adventureObject));

		currentAdventure = JSON.parse(localStorage.getItem("currentAdventure"));
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
		localStorage.removeItem("currentAdventure");
		localStorage.removeItem("currentQuestion");
		localStorage.removeItem("currentProgress");

		//redirect to village page
		history.push("/characters");
	}

	function submitAnswer(e) {
		e.preventDefault();
		let question = JSON.parse(localStorage.getItem("currentQuestion"));
		let adventure = JSON.parse(localStorage.getItem("currentAdventure"));
		console.log(" current question: ", question);
		console.log("submitted answer: ", e.target.value);
		console.log("correct answer: ", question.answer);

		if (!adventure.completed) {
			//handle correct answer updates
			if (parseInt(e.target.value) === question.answer) {
				console.log("CORRECT ANSWER!");
				setPassed(true);

				//update score value
				adventure.score = adventure.score + question.question_value;
				console.log("new score value: ", adventure);
				localStorage.setItem("currentAdventure", JSON.stringify(adventure));
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
		}

		if (currentStage + 1 > 10) {
			console.log("adventure is over!", currentAdventure);

			setCompleted(true);
			setRewardsClaimed(false);
			localStorage.removeItem("currentProgress");
			const nextStage = currentStage + 1;
			console.log("Advancing to the next stage: ", nextStage);
			setCurrentStage(nextStage);
			localStorage.setItem("currentProgress", JSON.stringify(nextStage));
			return;
		} else {
			localStorage.removeItem("currentQuestion");
			localStorage.removeItem("currentProgress");
			const nextStage = currentStage + 1;
			console.log("Advancing to the next stage: ", nextStage);
			setCurrentStage(nextStage);
			question = loadQuestion(nextStage - 1);
			localStorage.setItem("currentQuestion", JSON.stringify(question));
			localStorage.setItem("currentProgress", JSON.stringify(nextStage));
		}
	}

	function claimRewards(e) {
		e.preventDefault();

		let adventure = JSON.parse(localStorage.getItem("currentAdventure"));
		adventure.completed = true;
		// receive rewards/experience points
		//update the adventure object to represent total score/coins/experience points
		//add that adventure object to the database

		dispatch(
			addNewAdventureThunk(selectedCharacter?.id, adventure.adventure_type, adventure.score, adventure.completed)
		);
		dispatch(updateExperienceThunk(selectedCharacter?.id, adventure.score));

		//update setStates to render the home adventure page again
		setCompleted(false);
		setRewardsClaimed(true);
		setCurrentStage(1);
		setStarted(false);

		localStorage.removeItem("currentAdventure");
		localStorage.removeItem("currentQuestion");
		localStorage.removeItem("currentProgress");

		history.push("/village");
	}

	// THREE STATES YOU CAN BE IN:
	// 1: NO SELECTED CHARACTER
	// 2: SELECTED CHARACTER BUT NO ADVENTURE STARTED
	// 3: SELECTED CHARACTER ***AND*** ADVENTURE STARTED
	return (
		<>
			{!selectedCharacter && rewardsClaimed && parseInt(currentProgress) !== 10 ? (
				<div className="no-character-adv-page">
					<img src={require("../../static/appearances/unselected.PNG").default} alt="Female1"></img>
					<div>Please Select A Character To Start A New Adventure!</div>
					<NavLink to="/characters">Characters</NavLink>
				</div>
			) : (
				<>
					{selectedCharacter && Object.keys(currentAdventure).length === 0 ? (
						<div className="adventure-page-container">
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
							{completed === false && rewardsClaimed && currentStage <= 10 ? (
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
												<div className="player-icon icon">
													<img src={imagePreview.default} alt="player-icon" className="player-icon-image"></img>
												</div>
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
									<div className="stone-background">
										<div className="adv-ended-title-container">
											<p className="adv-ended">Adventure Ended!</p>
											<p className="return-title">Returning To The Village</p>
										</div>
										<div className="reward-stats-container">
											<p>SCORE: {currentAdventure.score}</p>
											<p>+10 Coins!</p>
											<p>{currentAdventure.score} Experience Gained</p>
										</div>
										<button className="rewards-button" onClick={claimRewards}>
											Claim Rewards!
										</button>
									</div>
								</div>
							)}
						</>
					)}
				</>
			)}
		</>
	);
}

export default AdventurePage;
