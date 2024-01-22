import "../AboutPage/About.css";

function AboutPage() {
	return (
		<>
			<div className="about-page-container">
				<h1>About</h1>
				<h3 className="about-summary">
					This website was created by Cory Campbell, A Software Engineer from Weatherford, TX with a background in Audio
					Engineering. A recent graduate of App Academy (December 2023) Looking to collaborate on new projects and
					searching for opportunities to work as a Software Engineer.
					<br />
					Feel free to reach out to me with any questions or projects!
				</h3>
				<div className="links-container">
					<div className="links-left">
						<h4 className="my-links-title">My Links</h4>
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
