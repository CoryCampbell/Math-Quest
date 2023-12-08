import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstName, setFirstName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let errorsObj = {};

		const data = await dispatch(signUp(username, firstName, password));

		if (Object.values(errors).length) {
			console.log("errors", errors);
			return;
		} else if (data) {
			errorsObj.firstName = data[0];
			errorsObj.username = data[1];
			errorsObj.password = errors.password;
			setErrors(errorsObj);
		} else {
			closeModal();
		}
	};

	function validateInfo() {
		const errorsObj = {};

		if (!password.length || !password.trim().length) errorsObj.password = "Please Create A Password!";

		if (password !== confirmPassword) errorsObj.password = "Please Enter Matching Passwords!";

		if (!firstName || !firstName.trim().length) errorsObj.firstName = "Please Enter Your First Name!";

		if (!username || !username.trim().length) errorsObj.username = "Please Enter A Username!";

		setErrors(errorsObj);
		return;
	}

	return (
		<>
			<h1>Sign Up</h1>
			<form className="sign-up-form-container" onSubmit={handleSubmit}>
				{errors.firstName && <p className="errors firstNameError">{errors.firstName}</p>}
				<label>
					First Name
					<input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
				</label>
				{errors.username && <p className="errors usernameError">{errors.username}</p>}
				<label>
					Username
					<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				</label>
				{errors.password && <p className="errors passwordError">{errors.password}</p>}
				<label>
					Password
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</label>
				<label>
					Confirm Password
					<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
				</label>
				<button className="sign-up-button" type="submit" onClick={validateInfo}>
					Sign Up
				</button>
			</form>
		</>
	);
}

export default SignupFormModal;
