import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { clearCharactersThunk } from "../../store/characters";
import { clearAdventureThunk, deleteAdventureThunk } from "../../store/adventures";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const adventure = useSelector((state) => state.adventure);
	const history = useHistory();
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(login("Demo", "password"));
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const handleLogout = async (e) => {
		e.preventDefault();

		dispatch(clearCharactersThunk());
		dispatch(clearAdventureThunk());

		if (Object.keys(adventure).length) {
			dispatch(deleteAdventureThunk(adventure.id));
		}
		dispatch(logout());

		localStorage.removeItem("character_name");
		localStorage.removeItem("currentQuestion");
		localStorage.removeItem("currentAdventure");
		localStorage.removeItem("currentProgress");
		localStorage.removeItem("enemy_health");
		localStorage.removeItem("current_health");

		closeMenu();
		history.push("/");
	};

	return (
		<div className="navigation-container">
			<ul className="nav-items-container">
				{isLoaded && sessionUser ? (
					<div className="logged-in-nav-container">
						<div className="selected-character-title">
							{selectedCharacter ? <p>{selectedCharacter?.character_name}</p> : <p>Select a Character</p>}
						</div>
						<div className="static-nav">
							<button className="log-out-button" onClick={handleLogout}>
								Log Out
							</button>
							<NavLink exact to="/village">
								Village
							</NavLink>
							<NavLink exact to="/characters">
								Characters
							</NavLink>
							<NavLink exact to="/shop">
								Shop
							</NavLink>
							<NavLink to="/adventures">Adventures</NavLink>
							<NavLink to="/dungeons">Dungeons</NavLink>
							<NavLink to="/quests">Quests</NavLink>
							<NavLink to="/statistics">Statistics</NavLink>
							<NavLink to="/leaderboard">Leaderboard</NavLink>
							<NavLink to="/about">About</NavLink>
						</div>
					</div>
				) : (
					<div className="landing-navlinks">
						<div className="user-log-commands-container">
							<div className="modal-buttons-container">
								<OpenModalButton
									buttonText="Log In"
									onItemClick={closeMenu}
									modalComponent={<LoginFormModal contentClassName="login-form-modal" />}
								/>
								<OpenModalButton buttonText="Sign Up" onItemClick={closeMenu} modalComponent={<SignupFormModal />} />
							</div>
							<button className="demo-user-button" type="submit" onClick={handleSubmit}>
								Demo User
							</button>
						</div>
						<div className="landing-links-container">
							<NavLink exact to="/">
								Home
							</NavLink>
							<NavLink to="/about">About</NavLink>
						</div>
					</div>
				)}
			</ul>
		</div>
	);
};

export default Navigation;
