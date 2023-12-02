import { useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import "./VillagePage.css";

function VillagePage() {
	let sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;

	return (
		<>
			<div className="village-page-container">
				<h1>Village</h1>
				<div className="subtitle-container">
					<NavLink to="/characters">Characters</NavLink>
					<NavLink to="/shop">Shop</NavLink>
					<NavLink to="/adventures">Adventures</NavLink>
				</div>
				<div className="village-options-container">
					<div className="village-option"></div>
					<div className="village-option"></div>
					<div className="village-option">
						<div className="adventure-options-container"></div>
					</div>
				</div>
			</div>
		</>
	);
}

export default VillagePage;
