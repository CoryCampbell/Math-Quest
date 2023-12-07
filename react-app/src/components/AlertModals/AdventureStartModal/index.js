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
			<p>You leave the Village in search of fame and fortune. Who knows what mysteries you will stumble across.</p>
			<div className="tips-container">
				You can run away from a fight if you find yourself low on health. After 10 stages, you will return to your
				Village and be rewarded for your progress!
			</div>
			<button type="button" onClick={handleSubmit}>
				Okay!
			</button>
		</div>
	);
}

export default AdventureStartModal;
