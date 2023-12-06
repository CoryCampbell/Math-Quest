// constants
const ADD_NEW_ADVENTURE = "adventures/addNewAdventure";
// const UPDATE_CHARACTER = "characters/updateCharacter";

// Action Creators
const addNewAdventure = (payload) => ({
	type: ADD_NEW_ADVENTURE,
	payload
});

// const updateCharacter = (oldCharacterName, newCharacterName) => ({
// 	type: DELETE_CHARACTER,
// 	oldCharacterName,
// 	newCharacterName
// });

//Thunks

//
//add new adventure thunk
//
export const addNewAdventureThunk = (character_id, adventure_type) => async (dispatch) => {
	const res = await fetch(`/api/adventures/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			character_id,
			score: 0,
			adventure_type,
			completed: false
		})
	});

	const data = await res.json();
	dispatch(addNewAdventure(data));
	return data;
};

//
//UPDATE AN ADVENTURE THUNK
//
// export const updateAdventureThunk = (oldCharacterName, newCharacterName) => async (dispatch) => {
// 	const res = await fetch(`/api/characters/${oldCharacterName}/${newCharacterName}`, {
// 		method: "PATCH"
// 	});

// 	if (res.ok) {
// 		const data = await res.json();
// 		dispatch(updateCharacter(oldCharacterName, newCharacterName));
// 		return data;
// 	} else {
// 		const errors = await res.json();
// 		return errors;
// 	}
// };

//Initial state
const initialState = {};

//Reducer
export default function charactersReducer(state = initialState, action) {
	const userAdventureAfterChange = { ...action.payload };
	switch (action.type) {
		case ADD_NEW_ADVENTURE:
			return { ...userAdventureAfterChange };
		// case UPDATE_ADVENTURE:
		// 	return { ...state, userCharacters: [userCharactersAfterChange] };
		default:
			return state;
	}
}
