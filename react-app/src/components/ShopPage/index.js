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
		<div className="shop-page-container">
			<div className="option-container">
				<div className="item-title">
					Lesser <br></br>Health Potion
				</div>
				<div className="item-title buff">+20hp</div>
				<img
					className="small-potion shop-item"
					src={require("../../static/shop-images/small-potion.png").default}
					alt="small-potion"
				></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						<div className="item-price">10</div>
					</button>
				</div>
			</div>
			{/* <div className="option-container">
				<div className="item-title">
					Greater <br></br>Health Potion
				</div>
				<img
					className="medium-potion shop-item"
					src={require("../../static/shop-images/medium-potion.png").default}
					alt="medium-potion"
				></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						50
					</button>
				</div>
			</div> */}
			{/* <div className="option-container">
				<div className="item-title">
					Perfected <br></br>Health Potion
				</div>
				<img
					className="large-potion shop-item"
					src={require("../../static/shop-images/large-potion.png").default}
					alt="large-potion"
				></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						100
					</button>
				</div>
			</div> */}
			<div className="option-container">
				<div className="item-title">
					Bow and <br></br>Arrows
				</div>
				<div className="item-title buff">+3 Damage</div>
				<img className="bow shop-item" src={require("../../static/shop-images/bow.png").default} alt="bow"></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						50
					</button>
				</div>
			</div>
			<div className="option-container">
				<div className="item-title">
					Great <br></br>Sword
				</div>
				<div className="item-title buff">+5 Damage</div>
				<img className="sword shop-item" src={require("../../static/shop-images/sword.png").default} alt="sword"></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						250
					</button>
				</div>
			</div>
			<div className="option-container">
				<div className="item-title">
					Heater<br></br>Shield
				</div>
				<div className="item-title buff">+5 Defense</div>
				<img
					className="shield shop-item"
					src={require("../../static/shop-images/shield.png").default}
					alt="shield"
				></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						500
					</button>
				</div>
			</div>
			<div className="option-container">
				<div className="item-title">Glaive</div>
				<div className="item-title buff">+10 Damage</div>
				<img
					className="glaive shop-item"
					src={require("../../static/shop-images/glaive.png").default}
					alt="glaive"
				></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						1,000
					</button>
				</div>
			</div>
			<div className="option-container">
				<div className="item-title">Staff</div>
				<div className="item-title buff">+25 Damage</div>
				<img className="staff shop-item" src={require("../../static/shop-images/staff.png").default} alt="staff"></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						5,000
					</button>
				</div>
			</div>
			<div className="option-container">
				<div className="item-title">
					Steel<br></br>Armor
				</div>
				<div className="item-title buff">+2 Defense</div>
				<img className="steel shop-item" src={require("../../static/shop-images/steel.png").default} alt="steel"></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						250
					</button>
				</div>
			</div>
			<div className="option-container">
				<div className="item-title">
					Golden<br></br>Armor
				</div>
				<div className="item-title buff">+5 Defense</div>
				<img className="gold shop-item" src={require("../../static/shop-images/gold.png").default} alt="gold"></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						1,000
					</button>
				</div>
			</div>
			<div className="option-container">
				<div className="item-title">
					Netherite<br></br>Armor
				</div>
				<div className="item-title buff">+10 Defense</div>
				<img
					className="netherite shop-item"
					src={require("../../static/shop-images/netherite.png").default}
					alt="netherite"
				></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						5,000
					</button>
				</div>
			</div>
			<div className="option-container">
				<div className="item-title">
					Obsidian<br></br>Armor
				</div>
				<div className="item-title buff">+25 Defense</div>
				<img
					className="obsidian shop-item"
					src={require("../../static/shop-images/obsidian.png").default}
					alt="obsidian"
				></img>
				<div className="purchase-container">
					<button className="purchase-button">
						<img className="coin-image" src={require("../../static/images/gold-coin.png").default} alt="coin"></img>
						10,000
					</button>
				</div>
			</div>
		</div>
	);
}

export default ShopPage;
