import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./ShopPage.css";

function ShopPage() {
	const sessionUser = useSelector((state) => state.session.user);

	if (!sessionUser) return <Redirect to="/" />;
	return (
		<>
			<div className="shop-page-container">Shop Page</div>
		</>
	);
}

export default ShopPage;
