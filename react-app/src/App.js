import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import CreditsPage from "./components/AboutPage";
import VillagePage from "./components/VillagePage";
import CharacterPage from "./components/CharacterPage";
import ShopPage from "./components/ShopPage";
import AdventurePage from "./components/AdventurePage";
import StatisticsPage from "./components/StatisticsPage";
import QuestsPage from "./components/QuestsPage";
import DungeonsPage from "./components/DungeonsPage";
import LeaderboardPage from "./components/LeaderboardPage";
import Footer from "./components/Footer";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(authenticate()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route path="/about">
						<CreditsPage />
					</Route>
					<Route path="/adventures">
						<AdventurePage />
					</Route>
					<Route path="/characters">
						<CharacterPage />
					</Route>
					<Route path="/dungeons">
						<DungeonsPage />
					</Route>
					<Route path="/quests">
						<QuestsPage />
					</Route>
					<Route path="/shop">
						<ShopPage />
					</Route>
					<Route path="/statistics">
						<StatisticsPage />
					</Route>
					<Route path="/village">
						<VillagePage />
					</Route>
					<Route path="/leaderboard">
						<LeaderboardPage />
					</Route>
					<Route exact path="/">
						<LandingPage />
					</Route>
				</Switch>
			)}
			<Footer />
		</>
	);
}

export default App;
