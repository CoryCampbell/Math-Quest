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

	const demoUser = () => {
		setUsername("Demo");
		setPassword("password");
		handleSubmit();
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(username, password));
		if (data) {
			console.log("data =============>", Object.keys(data));
			setErrors(data);
			console.log("errors", errors);
		} else {
			closeModal();
		}
	};

	return (
		<div className="login-modal-container">
			<h1>Log In</h1>
			<form className="user-input-container" onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="username-input-row">
					<label>
						Username
						<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
					</label>
				</div>
				<div className="password-input-row">
					<label>
						Password
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
					</label>
				</div>
				<button className="login-button" type="submit">
					Log In
				</button>
			</form>
			<button className="demo-user-button" onClick={demoUser}>
				Demo User
			</button>
		</div>
	);
}

export default LoginFormModal;
