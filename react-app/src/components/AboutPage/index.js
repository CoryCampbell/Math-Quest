// import { NavLink } from "react-router-dom";

import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "../AboutPage/About.css";

function AboutPage() {
	return (
		<>
			<div className="about-page-container">
				<h1>About</h1>
				<div className="links-container">
					<div className="links-left">
						<h2>"Mathematics is not a language. It's an adventure." - Paul Lockhart</h2>
						<h3>This Site was created by Cory Campbell</h3>
						<h3>Artwork done by Katelyn Owens</h3>
					</div>
					<div className="links-right">
						<a target="_blank" rel="noreferrer" href="https://github.com/CoryCampbell">
							Cory Campbell's Github
						</a>
						<p>Discord: MonkeyDCory</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default AboutPage;
