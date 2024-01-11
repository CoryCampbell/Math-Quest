import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./ShopPage.css";

function ShopPage() {
	const sessionUser = useSelector((state) => state.session.user);
	const currentAdventure = localStorage.getItem("currentAdventure") || {};

	if (!sessionUser) return <Redirect to="/" />;

	if (Object.keys(currentAdventure).length !== 0) {
		alert("You are on an adventure! You can't use the shop right now!");

		return <Redirect to="/adventures" />;
	}
	return (
		<>
			<div className="shop-page-container">
				<h3>POTIONS</h3>
				<div className="potions-section">
					<img
						className="small-potion shop-item"
						src={require("../../static/shop-images/small-potion.png").default}
						alt="small-potion"
					></img>
					<img
						className="medium-potion shop-item"
						src={require("../../static/shop-images/medium-potion.png").default}
						alt="medium-potion"
					></img>
					<img
						className="large-potion shop-item"
						src={require("../../static/shop-images/large-potion.png").default}
						alt="large-potion"
					></img>
				</div>
				<h3>WEAPONS</h3>
				<div className="weapons-section">
					<img className="bow shop-item" src={require("../../static/shop-images/bow.png").default} alt="bow"></img>
					<img
						className="sword shop-item"
						src={require("../../static/shop-images/sword.png").default}
						alt="sword"
					></img>
					<img
						className="shield shop-item"
						src={require("../../static/shop-images/shield.png").default}
						alt="shield"
					></img>
					<img
						className="glaive shop-item"
						src={require("../../static/shop-images/glaive.png").default}
						alt="glaive"
					></img>
					<img
						className="staff shop-item"
						src={require("../../static/shop-images/staff.png").default}
						alt="staff"
					></img>
				</div>
				<h3>ARMOR</h3>
				<div className="armor-section">
					<img
						className="steel shop-item"
						src={require("../../static/shop-images/steel.png").default}
						alt="steel"
					></img>
					<img className="gold shop-item" src={require("../../static/shop-images/gold.png").default} alt="gold"></img>
					<img
						className="netherite shop-item"
						src={require("../../static/shop-images/netherite.png").default}
						alt="netherite"
					></img>
					<img
						className="obsidian shop-item"
						src={require("../../static/shop-images/obsidian.png").default}
						alt="obsidian"
					></img>
				</div>
			</div>
		</>
	);
}

export default ShopPage;
