// const levelingSystem = {
// 	levels: [
// 		{ level: 1, xpRequired: 0, description: "Novice - Introduction to basic arithmetic." },
// 		{ level: 2, xpRequired: 50, description: "Apprentice - Addition and subtraction within 1-10." },
// 		{ level: 3, xpRequired: 100, description: "Junior Mathematician - Multiplication up to 5." },
// 		{ level: 4, xpRequired: 200, description: "Senior Mathematician - Division up to 5." },
// 		{ level: 5, xpRequired: 350, description: "Math Explorer - Mixed operations within 1-10." },
// 		{ level: 6, xpRequired: 500, description: "Advanced Explorer - Larger numbers up to 20." },
// 		{ level: 7, xpRequired: 750, description: "Math Whiz - Word problems and logic puzzles." },
// 		{ level: 8, xpRequired: 1000, description: "Number Ninja - Advanced problems up to 50." },
// 		{ level: 9, xpRequired: 1250, description: "Math Master - Mastery of all basic operations." },
// 		{ level: 10, xpRequired: 1500, description: "Arithmetical Prodigy - Introduction to fractions." },
// 		// Add more levels as needed
// 		// ...
// 		{
// 			level: 50,
// 			xpRequired: 30000,
// 			description: "Ultimate Math Being - Attaining the highest level of mathematical enlightenment."
// 		}
// 	],

// 	// Function to get level details based on XP
// 	getLevelDetails: function (xp) {
// 		for (const levelData of this.levels) {
// 			if (xp >= levelData.xpRequired) {
// 				return levelData;
// 			}
// 		}
// 		return null; // If XP is higher than the highest level
// 	}
// };

// // Example usage:
// const playerXP = 800; // Replace with the actual XP of the player
// const playerLevelDetails = levelingSystem.getLevelDetails(playerXP);
