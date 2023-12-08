import React from "react";
import { useModal } from "../../../context/Modal";

import "./AdventureStartModal.css";

function AdventureStartModal() {
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		closeModal();
	};

	return (
		<div className="adventure-start-container">
			<p>
				*You leave the Village in search of fame and fortune. Who knows what mysteries you will stumble across along
				your way!*
			</p>
			<div className="tips-container">
				<p>Tip: You can run away from a fight if you find yourself low on health.</p>
				<p>Tip: After 10 stages, you will return to your Village and be rewarded for your progress!</p>
			</div>
			<button type="button" onClick={handleSubmit}>
				Okay!
			</button>
		</div>
	);
}

export default AdventureStartModal;
