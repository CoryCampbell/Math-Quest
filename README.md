# MathQuest

Welcome to Mathquest! 

This is my Capstone Project for graduation from App Academy. It is a Web-based Game, where kids can practice their math skills and have fun while theyre doing it!
Users can login/signup to save their progress, and continue to level up their characters.



# Live Link

[MathQuest](https://mathquest.onrender.com)




# Features coming soon

-Shop to purchase potions and gear

-Quests (achievements)

-Statistics for each character

-Endless Dungeons Mode and New Gear

-Global leaderboard




# Tech Stack

![Python](https://a11ybadges.com/badge?logo=python) ![Flask](https://a11ybadges.com/badge?logo=flask) ![JavaScript](https://a11ybadges.com/badge?logo=javascript) ![React](https://a11ybadges.com/badge?logo=react) ![Redux](https://a11ybadges.com/badge?logo=redux) ![CSS3](https://a11ybadges.com/badge?logo=css3) ![HTML5](https://a11ybadges.com/badge?logo=html5) 

# Database
![PostgreSQL](https://a11ybadges.com/badge?logo=postgresql)

Hosted by: Render



# Index

[MathQuest Features List](https://github.com/CoryCampbell/Math-Quest/wiki/Feature-List)

[MathQuest DB Diagram](https://github.com/CoryCampbell/Math-Quest/wiki/MathQuest-DB-Diagram)

[MathQuest User Stories](https://github.com/CoryCampbell/Math-Quest/wiki/MathQuest-User-Stories)

[MathQuest Wireframes](https://github.com/CoryCampbell/Math-Quest/wiki/MathQuest-Wireframes)



# Screenshots

![village-preview](https://github.com/CoryCampbell/Math-Quest/assets/110738538/fede2f86-8d76-4665-a2a8-ced07d2eddb2)

Customizable Character Appearances:

![characters-preview](https://github.com/CoryCampbell/Math-Quest/assets/110738538/f8cd9bb3-655c-4828-900f-e78dadaf2494)

Solve Match Problems to Gain Experience: 

![adventure-preview](https://github.com/CoryCampbell/Math-Quest/assets/110738538/d3d0f46e-e155-4dd5-80ee-5715d427614d)



# Endpoints

Frontend Routes:

![image](https://github.com/CoryCampbell/Math-Quest/assets/110738538/2180017c-97ae-42d3-b40d-b0b74f6a8c39)



Backend Routes: 

![image](https://github.com/CoryCampbell/Math-Quest/assets/110738538/fc893d27-4664-4979-92ae-b599a10a5963)



# Thoughts about the Process

Getting the Character's data to render correctly in real time was the biggest issue I have come across so far. It has really pushed me to deepen my understanding of React/Redux.

I really felt pleased with myself when I created a function that randomly generates questions for the user based on their current stage. I also increased experience gained to match the values of the answer of the current question, so experience gained values scale with your current stage as well. I need to figure out how implement a health system for the adventures to give more of a risk/reward experience for users who have missed questions and are starting to get low on health. And also I have enemies visually on the screen but there isnt really anything going on with them without a health system. Im thinking about changing some code to where the stage doesnt change until you get a question right, so you must answer 10 questions correctly to end the adventure.

I've now implemented the health system and now the adventure only ends after the enemy's health has dropped to zero. Before it was just 10 questions; answered correctly or not, it didn't make a difference. Now the adventure will continue much further past 10 questions depending on how much damage has been taken or recieved.

Now I am working on my backend routes to connect the characters inventory and implementing the next feature which is a Shop! This shop will include items such as armor/weapons as well as potions to extend your adventure even longer.




# Connect with the creator

email: corycampbell20@yahoo.com

github: @CoryCampbell

discord: corythedev
