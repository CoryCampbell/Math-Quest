import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./VillagePage.css";

function VillagePage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;

	const currerntCharacter = localStorage.getItem("character_name") || {};

	return (
		<>
			{Object.keys(currerntCharacter).length ? (
				<div className="village-page-container">
					<h1>Village</h1>
					<div className="village-options-container">
						<button className="village-option">
							<p>Live!</p>
							<NavLink to="/shop">Shop</NavLink>
						</button>

						<button className="village-character-option">
							<p>Live!</p>
							<NavLink to="/characters">Characters</NavLink>
						</button>
						<button className="village-option">
							<p>Live!</p>
							<NavLink to="/adventures">Adventures</NavLink>
						</button>
					</div>
				</div>
			) : (
				<>
					<div className="village-page-container">
						<h1>Village</h1>
						<div className="village-options-container">
							<button className="village-option-closed" disabled>
								<p>Shop Is Closed. Please Select A Character And Return Later!</p>
								<p className="x">X</p>
							</button>

							<button className="village-character-option">
								<img src={require("../../static/appearances/unselected.PNG").default} alt="Female1"></img>
								<p>Choose A Character To Start Your Journey!</p>
								<NavLink to="/characters">Characters</NavLink>
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
