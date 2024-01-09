import React from "react";
import { useSelector } from "react-redux";
import "./HealthBar.css";

const HealthBar = ({ health }) => {
	const selectedCharacter = useSelector((state) => state.characters.selectedCharacter);
	const normalizedHealth = Math.round((health / selectedCharacter.max_health) * 100);
	const barColor = getHealthColor(normalizedHealth);

	return (
		<div className="HealthBarContainer">
			<div className={`HealthBar ${barColor}`} style={{ width: `${normalizedHealth}%` }}></div>
			<p>Health: {normalizedHealth}%</p>
		</div>
	);
};

const getHealthColor = (health) => {
	if (health > 70) {
		return "green";
	} else if (health > 30) {
		return "orange";
	} else {
		return "red";
	}
};

export default HealthBar;
