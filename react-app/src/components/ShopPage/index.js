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
					<div className="option-container">
						<img
							className="small-potion shop-item"
							src={require("../../static/shop-images/small-potion.png").default}
							alt="small-potion"
						></img>
						<div>
							<div>Lesser Health Potion</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
					<div className="option-container">
						<img
							className="medium-potion shop-item"
							src={require("../../static/shop-images/medium-potion.png").default}
							alt="medium-potion"
						></img>
						<div>
							<div>Greater Health Potion</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
					<div className="option-container">
						<img
							className="large-potion shop-item"
							src={require("../../static/shop-images/large-potion.png").default}
							alt="large-potion"
						></img>
						<div>
							<div>Perfected Health Potion</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
				</div>
				<h3>WEAPONS</h3>
				<div className="weapons-section">
					<div className="option-container">
						<img className="bow shop-item" src={require("../../static/shop-images/bow.png").default} alt="bow"></img>
						<div>
							<div>Bow and Arrows</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
					<div className="option-container">
						<img
							className="sword shop-item"
							src={require("../../static/shop-images/sword.png").default}
							alt="sword"
						></img>
						<div>
							<div>Greatsword</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
					<div className="option-container">
						<img
							className="shield shop-item"
							src={require("../../static/shop-images/shield.png").default}
							alt="shield"
						></img>
						<div>
							<div>Shield</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
					<div className="option-container">
						<img
							className="glaive shop-item"
							src={require("../../static/shop-images/glaive.png").default}
							alt="glaive"
						></img>
						<div>
							<div>Glaive</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
					<div className="option-container">
						<img
							className="staff shop-item"
							src={require("../../static/shop-images/staff.png").default}
							alt="staff"
						></img>
						<div>
							<div>Staff</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
				</div>
				<h3>ARMOR</h3>
				<div className="armor-section">
					<div className="option-container">
						<img
							className="steel shop-item"
							src={require("../../static/shop-images/steel.png").default}
							alt="steel"
						></img>
						<div>
							<div>Steel Armor</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
					<div className="option-container">
						<img className="gold shop-item" src={require("../../static/shop-images/gold.png").default} alt="gold"></img>
						<div>
							<div>Golden Armor</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
					<div className="option-container">
						<img
							className="netherite shop-item"
							src={require("../../static/shop-images/netherite.png").default}
							alt="netherite"
						></img>
						<div>
							<div>Netherite Armor</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
					<div className="option-container">
						<img
							className="obsidian shop-item"
							src={require("../../static/shop-images/obsidian.png").default}
							alt="obsidian"
						></img>
						<div>
							<div>Obsidian Armor</div>
							<div>price</div>
							<button>BUY</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ShopPage;
