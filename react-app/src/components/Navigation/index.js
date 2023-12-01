import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import demoUser from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const history = useHistory();
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

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
						<NavLink exact to="/village">
							Village
						</NavLink>
						<NavLink exact to="/character">
							Character
						</NavLink>
						<NavLink exact to="/shop">
							Shop
						</NavLink>
						<NavLink to="/adventure">Adventure</NavLink>
						<NavLink to="/dungeons">Dungeons</NavLink>
						<NavLink to="/quests">Quests</NavLink>
						<NavLink to="/statistics">Statistics</NavLink>
						<NavLink to="/about">About</NavLink>
						<li>
							<button onClick={handleLogout}>Log Out</button>
						</li>
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
}

export default Navigation;
