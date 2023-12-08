import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let errorsObj = {};

		const data = await dispatch(login(username, password));

		if (Object.values(errors).length) {
			console.log("errors", errors);
			return;
		} else if (data) {
			errorsObj.username = data[0];
			errorsObj.password = data[1];
			console.log("==============> errorsObj", errorsObj);
			setErrors(errorsObj);
		} else {
			closeModal();
		}
	};

	function validateInfo() {
		let errorsObj = {};

		if (!username || !username.trim().length) errorsObj.username = "Please enter your Username!";

		if (!password || !password.trim().length) errorsObj.password = "Please enter your password!";

		setErrors(errorsObj);
		return;
	}

	return (
		<div className="login-modal-container">
			<h1>Log In</h1>
			<form className="user-input-container" onSubmit={handleSubmit}>
				<div className="username-input-row">
					{errors.username && <p className="errors usernameError">{errors.username}</p>}
					<label>
						Username
						<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
					</label>
				</div>
				<div className="password-input-row">
					{errors.password && <p className="errors passwordError">{errors.password}</p>}
					<label>
						Password
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</label>
				</div>
				<button className="login-button" type="submit" onClick={validateInfo}>
					Log In
				</button>
			</form>
		</div>
	);
}

export default LoginFormModal;
