import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./VillagePage.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function VillagePage() {
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;

	const currentCharacter = localStorage.getItem("character_name") || {};

	function toCharPage() {
		history.push(`/characters`);
	}
	function toShopPage() {
		history.push("/shop");
	}
	function toAdventuresPage() {
		history.push("/adventures");
	}

	return (
		<>
			{Object.keys(currentCharacter).length ? (
				<div className="village-page-container">
					<div className="village-options-container">
						<button className="village-option" onClick={toShopPage}>
							<p>Shop</p>
						</button>

						<button className="village-character-option" onClick={toCharPage}>
							<p>Characters</p>
						</button>
						<button className="village-option" onClick={toAdventuresPage}>
							<p>Adventures!</p>
						</button>
					</div>
				</div>
			) : (
				<>
					<div className="village-page-container">
						<div className="village-options-container">
							<button className="village-option-closed" disabled>
								<p>Shop Is Closed. Please Select A Character And Return Later!</p>
								<p className="x">X</p>
							</button>

							<button className="village-character-option" onClick={toCharPage}>
								<img src={require("../../static/appearances/unselected.PNG").default} alt="Female1"></img>
								<p>Choose A Character To Start Your Journey!</p>
							</button>
							<button className="village-option-closed" disabled>
								<p>Adventures need Heroes. Please Select A Character To Start An Adventure!</p>
								<p className="x">X</p>
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default VillagePage;
