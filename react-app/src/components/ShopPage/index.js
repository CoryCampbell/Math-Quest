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
				<div className="shop-left">L</div>
				<div className="shop-right">
					<div className="shop-item-preview">Preview</div>
					<button className="buy button">Buy</button>
				</div>
			</div>
		</>
	);
}

export default ShopPage;
