import "../AboutPage/About.css";

function AboutPage() {
	return (
		<>
			<div className="about-page-container">
				<h1>About</h1>
				<div className="links-container">
					<div className="links-left">
						<div className="clickables">
							<a href="https://github.com/CoryCampbell" target="_blank" rel="noreferrer">
								<i className="fa-brands fa-github"></i>
							</a>
							<a href="https://linkedin.com/in/cory-campbell-67694b2a5" target="_blank" rel="noreferrer">
								<i className="fa-brands fa-linkedin"></i>
							</a>
							<i className="fa-brands fa-discord"> corythedev</i>
						</div>
					</div>
					<div className="links-right">
						<h3>Artwork done by Katelyn Owens</h3>
					</div>
				</div>
			</div>
		</>
	);
}

export default AboutPage;
