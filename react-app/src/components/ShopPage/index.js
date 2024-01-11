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
					<div className="small-potion shop-item">Small Potion</div>
					<div className="medium-potion shop-item">Medium Potion</div>
					<div className="large-potion shop-item">Large Potion</div>
				</div>
				<h3>WEAPONS</h3>
				<div className="weapons-section">
					<div className="bow-arrows shop-item">Bow & arrows</div>
					<div className="sword shop-item">Sword</div>
					<div className="shield shop-item">Shield</div>
					<div className="glaive shop-item">Glaive</div>
					<div className="staff shop-item">Staff</div>
				</div>
				<h3>ARMOR</h3>
				<div className="armor-section">
					<div className="steel-armor shop-item">Steel Armor</div>
					<div className="golden-armor shop-item">Golden Armor</div>
					<div className="netherite-armor shop-item">Netherite Armor</div>
					<div className="obsidian-armor shop-item">Obsidian Armor</div>
				</div>
			</div>
		</>
	);
}

export default ShopPage;
