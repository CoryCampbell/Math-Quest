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
				<div className="village-options-container">
					<div className="village-option">
						<NavLink to="/character">Character</NavLink>
					</div>
					<div className="village-option">
						<NavLink to="/shop">Shop</NavLink>
					</div>
					<div className="village-option">
						<NavLink to="/adventure">Adventure</NavLink>
					</div>
				</div>
			</div>
		</>
	);
}

export default VillagePage;
