import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	// const [username, setUsername] = useState("");
	// const [password, setPassword] = useState("");
	// const [errors, setErrors] = useState([]);
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

	const handleLogout = (e) => {
		e.preventDefault();
		closeMenu();
		history.push("/");
		dispatch(logout());
	};

	return (
		<div className="navigation-container">
			<ul className="nav-items-container">
				{isLoaded && sessionUser ? (
					<div className="logged-in-nav-container">
						<li>Greetings, {sessionUser.first_name}</li>
						<li>
							<button onClick={handleLogout}>Log Out</button>
						</li>
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
						<NavLink to="/about">About</NavLink>
					</div>
				) : (
					<div className="landing-navlinks">
						<div className="user-log-commands-container">
							<OpenModalButton
								buttonText="Log In"
								onItemClick={closeMenu}
								modalComponent={<LoginFormModal contentClassName="login-form-modal" />}
							/>
							<OpenModalButton buttonText="Sign Up" onItemClick={closeMenu} modalComponent={<SignupFormModal />} />
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
