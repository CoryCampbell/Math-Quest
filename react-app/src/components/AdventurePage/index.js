import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
	getSelectedCharacterThunk,
	getUserCharactersThunk,
	updateExperienceThunk,
	changeCharacterHealthThunk
} from "../../store/characters";
import { useEffect, useState } from "react";
import { addNewAdventureThunk } from "../../store/adventures";

import AdventureStartModal from "../AlertModals/AdventureStartModal";
import OpenModalButton from "../OpenModalButton";
import "./AdventurePage.css";

import HealthBar from "../HealthBar";

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

	const addMonster = "../../static/enemies/addMonster.png";
	const subMonster = "../../static/enemies/subMonster.png";
	let currentAdventure = localStorage.getItem("currentAdventure") || {};
	let currentQuestion = localStorage.getItem("currentQuestion") || {};
	let currentProgress = localStorage.getItem("currentProgress") || {};
	let currentHealth = selectedCharacter?.current_health;
	const maxEnemyHealth = selectedCharacter?.max_health;
	const currentEnemyHealth = localStorage.getItem("enemy_health") || maxEnemyHealth;
	const appearance = selectedCharacter?.appearance;

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

	const [playerHealth, setPlayerHealth] = useState(currentHealth);

	const [enemyHealthState, setEnemyHealthState] = useState(currentEnemyHealth);

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

		//clear any residual data from previous adventures
		e.preventDefault();


		//create progress tracker for local storage
		localStorage.setItem("currentProgress", 1);
		localStorage.setItem("current_health", selectedCharacter.current_health);

		//create adventure object shell that will eventually be added to db
		let adventureObject = {};
		adventureObject.adventure_type = adventure_type;
		adventureObject.character_id = selectedCharacter.id;
		adventureObject.score = 0;
		adventureObject.completed = false;

		localStorage.setItem("currentAdventure", JSON.stringify(adventureObject));
		localStorage.setItem("enemy_health", maxEnemyHealth);

		currentAdventure = JSON.parse(localStorage.getItem("currentAdventure"));

		currentQuestion = loadQuestion(currentStage, currentAdventure.adventure_type);
	}

	function loadQuestion(nextStage, adventure_type) {
		let question;

		if (adventure_type === "addition") {
			let num1 = Math.floor(Math.random() * 10) + nextStage;
			let num2 = Math.floor(Math.random() * 10) + nextStage;
			let currentQuestion = `${num1} + ${num2}`;
			let answer = num1 + num2;
			let answer2 = Math.floor(Math.random() * 10) + nextStage;
			let answer3 = Math.floor(Math.random() * 10) + nextStage;
			let answer4 = Math.floor(Math.random() * 10) + nextStage;
			let choices = [answer, answer2, answer3, answer4];

			//RANDOMIZE ORDER OF CHOICES
			choices = randomizeChoices(choices.slice());

			//CHECK FOR DUPLICATE ANSWER CHOICES
			choices = checkForDuplicateAnswers(choices.slice(), nextStage);

			let question_value = answer;
			question = { question: currentQuestion, answer, choices, question_value };
		} else if (adventure_type === "subtraction") {
			let num1 = Math.floor(Math.random() * 10) + nextStage;
			let num2 = Math.floor(Math.random() * 10) + nextStage;

			let currentQuestion;
			let answer;
			let question_value;
			if (num1 > num2) {
				currentQuestion = `${num1} - ${num2}`;
				answer = num1 - num2;
				question_value = num1;
			} else {
				currentQuestion = `${num2} - ${num1}`;
				answer = num2 - num1;
				question_value = num2;
			}
			let answer2 = Math.floor(Math.random() * 10) + nextStage;
			let answer3 = Math.floor(Math.random() * 10) + nextStage;
			let answer4 = Math.floor(Math.random() * 10) + nextStage;
			let choices = [answer, answer2, answer3, answer4];

			//RANDOMIZE ORDER OF CHOICES
			choices = randomizeChoices(choices.slice());
			//CHECK FOR DUPLICATE ANSWER CHOICES
			choices = checkForDuplicateAnswers(choices.slice(), nextStage);

			question = { question: currentQuestion, answer, choices, question_value };
		} else if (adventure_type === "multiplication") {
			let num1 = Math.floor(Math.random() * 10) * nextStage;
			let num2 = Math.floor(Math.random() * 10) * nextStage;
			let currentQuestion = `${num1} x ${num2}`;
			let answer = num1 * num2;
			let answer2 = answer - 1;
			if (answer2 <= 0) answer2 += 2;
			let answer3 = answer + 2;
			let answer4 = answer + 5;
			let choices = [answer, answer2, answer3, answer4];

			//RANDOMIZE ORDER OF CHOICES
			choices = randomizeChoices(choices.slice());

			//CHECK FOR DUPLICATE ANSWER CHOICES
			choices = checkForDuplicateAnswers(choices.slice(), nextStage);

			let question_value = answer;
			question = { question: currentQuestion, answer, choices, question_value };
		} else if (adventure_type === "division") {
			let num1 = Math.floor(Math.random() * 10) + nextStage;
			let num2 = Math.floor(Math.random() * 10) + nextStage;

			// Ensure num2 is not 0 to avoid division by zero
			while (num2 === 0) {
				num2 = Math.floor(Math.random() * 10) + nextStage;
			}

			// Ensure that the division results in a whole number
			let result = num1;
			let currentQuestion = `${num1 * num2} / ${num2}`;
			let answer = result;

			let answer2 = Math.floor(Math.random() * 10) + nextStage;
			let answer3 = Math.floor(Math.random() * 10) + nextStage;
			let answer4 = Math.floor(Math.random() * 10) + nextStage;

			let choices = [answer, answer2, answer3, answer4];

			// RANDOMIZE ORDER OF CHOICES
			choices = randomizeChoices(choices.slice());

			// CHECK FOR DUPLICATE ANSWER CHOICES
			choices = checkForDuplicateAnswers(choices.slice(), nextStage);

			let question_value = num1 * num2;
			question = { question: currentQuestion, answer, choices, question_value };
		}

		localStorage.setItem("currentQuestion", JSON.stringify(question));
		return question;
	}

	function checkForDuplicateAnswers(choices, nextStage) {
		let uniqueSet = new Set();

		for (let i = 0; i < choices.length; i++) {
			let answer = choices[i];

			while (uniqueSet.has(answer)) {
				answer += Math.floor(Math.random() * 10) + nextStage;
			}

			choices[i] = answer;
			uniqueSet.add(answer);
		}

		return choices;
	}

	//FISHER YATES SHUFFLE ALGORITHM
	function randomizeChoices(choices) {
		for (let i = choices.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1));

			[choices[i], choices[randomIndex]] = [choices[randomIndex], choices[i]];
		}

		return choices;
	}

	function usePotion(e) {
		e.preventDefault();
		//remove potion from inventory

		//update user HP
		let newHealth = currentHealth + 20;

		if (newHealth > selectedCharacter.max_health) {
			newHealth = selectedCharacter.max_health;
		}

		localStorage.setItem("current_health", newHealth);
		setPlayerHealth(newHealth);
		dispatch(changeCharacterHealthThunk(selectedCharacter.id, -20));
		dispatch(getUserCharactersThunk());
		dispatch(getSelectedCharacterThunk());
	}

	function runAway(e) {
		e.preventDefault();

		//remove adventure from local storage
		localStorage.removeItem("currentAdventure");
		localStorage.removeItem("currentQuestion");
		localStorage.removeItem("currentProgress");
		localStorage.removeItem("enemy_health");
		localStorage.removeItem("current_health");

		//redirect to village page
		history.push("/characters");
	}

	function submitAnswer(e) {
		e.preventDefault();
		let question = JSON.parse(localStorage.getItem("currentQuestion"));
		let adventure = JSON.parse(localStorage.getItem("currentAdventure"));

		if (!adventure.completed) {
			//handle correct answer updates
			if (parseInt(e.target.value) === question.answer) {
				setPassed(true);
				let currentEnemyHealth = JSON.parse(localStorage.getItem("enemy_health"));
				currentEnemyHealth -= 10;

				if (currentEnemyHealth < 0) currentEnemyHealth = 0;

				localStorage.setItem("enemy_health", JSON.stringify(currentEnemyHealth));
				setEnemyHealthState(currentEnemyHealth);
				dispatch(getUserCharactersThunk());
				//update score value
				if (question.question_value === 0) {
					adventure.score += 10;
				} else adventure.score = adventure.score + question.question_value;
				localStorage.setItem("currentAdventure", JSON.stringify(adventure));
			}

			//handle incorrect answer updates
			if (parseInt(e.target.value) !== question.answer) {
				setPassed(false);
				//changes health in db to correct value from taking damage in adventure
				let currentHealth = localStorage.getItem("current_health");
				currentHealth -= 10;
				const healthChange = 10;
				setPlayerHealth(currentHealth);
				localStorage.setItem("current_health", JSON.stringify(currentHealth));
				dispatch(changeCharacterHealthThunk(selectedCharacter.id, healthChange));
				dispatch(getUserCharactersThunk());
				dispatch(getSelectedCharacterThunk());
			}
		}

		if (enemyHealthState - 10 <= 0) {

			setCompleted(true);
			setRewardsClaimed(false);
			localStorage.removeItem("currentProgress");
			//this is the end of the adventure (after 10 stages), but the end page renders on stage 11.
			const nextStage = currentStage + 1;
			setCurrentStage(nextStage);
			localStorage.setItem("currentProgress", JSON.stringify(nextStage));
			return;
		} else {
			localStorage.removeItem("currentQuestion");
			localStorage.removeItem("currentProgress");
			const nextStage = currentStage;
			setCurrentStage(nextStage);
			question = loadQuestion(nextStage, currentAdventure.adventure_type);
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
		localStorage.removeItem("enemy_health");
		localStorage.removeItem("current_health");

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
								<button className="adventure-option sub" value="subtraction" onClick={startAdventure}>
									Subtraction Adventure
								</button>
								<button className="adventure-option mult" value="multiplication" onClick={startAdventure}>
									Multiplication Adventure!
								</button>
								<button className="adventure-option division" value="division" onClick={startAdventure}>
									Division Adventure!
								</button>
							</div>
						</div>
					) : (
						<>
							{completed === false && rewardsClaimed && enemyHealthState > 0 ? (
								<div className="current-adventure-container">
									<div className="adventure-info-container">
										<div className="adv-top-left">
											<div>{selectedCharacter?.character_name}</div>
											<div>
												<div>
													❤{currentHealth} / {selectedCharacter?.max_health}
												</div>
											</div>
										</div>
										<div className="help-button-container">
											<OpenModalButton
												buttonText="Help"
												modalComponent={<AdventureStartModal className="adventure-start-help-button" />}
											></OpenModalButton>
										</div>
										<div className="adv-top-right">
											<div className="coin-total">
												{" "}
												<img
													className="coin-image"
													src={require("../../static/images/gold-coin.png").default}
													alt="coin"
												></img>{" "}
												{selectedCharacter?.coins}
											</div>
											<div>
												level {selectedCharacter?.level} XP: {selectedCharacter?.experience_points}
											</div>
										</div>
									</div>
									<div className="full-game-container">
										<div className="stage-time-container">
											<div className="potion-container">
												<button className="use-potion-button" onClick={usePotion}>
													Use Potion
												</button>{" "}
												x5
											</div>
											<div>Score: {currentAdventure["score"]}</div>
											<button className="run-away-button" value={adventure?.id} onClick={runAway}>
												Run Away!
											</button>
										</div>
										<div className="bottom-game-container">
											<div className="visual-game-container">
												{currentAdventure.adventure_type === "addition" ? (
													<div className="player-icon icon addback">
														<img src={imagePreview?.default} alt="player-icon" className="player-icon-image"></img>
													</div>
												) : currentAdventure.adventure_type === "subtraction" ? (
													<div className="player-icon icon subback">
														<img src={imagePreview?.default} alt="player-icon" className="player-icon-image"></img>
													</div>
												) : currentAdventure.adventure_type === "division" ? (
													<div className="player-icon icon divback">
														<img src={imagePreview?.default} alt="player-icon" className="player-icon-image"></img>
													</div>
												) : (
													<div className="player-icon icon multback">
														<img src={imagePreview?.default} alt="player-icon" className="player-icon-image"></img>
													</div>
												)}
												{currentAdventure.adventure_type === "addition" ? (
													<div className="enemy-icon icon addback">
														<img
															src={require("../../static/enemies/addMonster.png").default}
															alt="enemy-icon"
															className="enemy-icon-image"
														></img>
													</div>
												) : currentAdventure.adventure_type === "subtraction" ? (
													<div className="enemy-icon icon subback">
														<img
															src={require("../../static/enemies/subMonster.png").default}
															alt="enemy-icon"
															className="enemy-icon-image"
														></img>
													</div>
												) : currentAdventure.adventure_type === "division" ? (
													<div className="enemy-icon icon divback">
														<img
															src={require("../../static/enemies/DivMonster.png").default}
															alt="enemy-icon"
															className="enemy-icon-image"
														></img>
													</div>
												) : (
													<div className="enemy-icon icon multback">
														<img
															src={require("../../static/enemies/MultiplicationOne.png").default}
															alt="enemy-icon"
															className="enemy-icon-image multmonster"
														></img>
													</div>
												)}
											</div>
											<div className="math-game-container">
												<div className="health-bar-container">
													<div className="player-healthbar-container">
														<HealthBar health={currentHealth} />
													</div>
													<div className="enemy-healthbar-container">
														<HealthBar health={enemyHealthState} />
													</div>
												</div>
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
