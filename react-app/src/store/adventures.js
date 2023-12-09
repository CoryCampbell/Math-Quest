// constants
const GET_CURRENT_ADVENTURE = "adventures/getCurrentAdventure";
const ADD_NEW_ADVENTURE = "adventures/addNewAdventure";
const CLEAR_ADVENTURE = "adventures/clearAdventure";
const UPDATE_ADVENTURE = "adventures/updateAdventure";

// Action Creators
const addNewAdventure = (payload) => ({
	type: ADD_NEW_ADVENTURE,
	payload
});

const clearAdventure = (payload) => ({
	type: CLEAR_ADVENTURE,
	payload
});

const updateAdventure = (adventure_id, new_score) => ({
	type: UPDATE_ADVENTURE,
	adventure_id,
	new_score
});

const getCurrentAdventure = (character_id) => ({
	type: GET_CURRENT_ADVENTURE,
	character_id
});

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

export const clearAdventureThunk = (adventure_id) => async (dispatch) => {
	const res = await fetch(`/api/adventures/${adventure_id}`);

	if (res.ok) {
		const data = await res.json();
		dispatch(clearAdventure());
		return data;
	} else {
		const errors = await res.json();
		return errors;
	}
};

//
//UPDATE AN ADVENTURE THUNK
//
export const updateAdventureThunk = (adventure_id, new_score) => async (dispatch) => {
	const res = await fetch(`/api/adventures/${adventure_id}/${new_score}`, {
		method: "PATCH"
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(updateAdventure(adventure_id, new_score));
		return data;
	} else {
		const errors = await res.json();
		return errors;
	}
};

export const getCurrentAdventureThunk = (character_id) => async (dispatch) => {
	const res = await fetch(`/api/adventures/${character_id}`, {
		method: "GET"
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(getCurrentAdventure(character_id));
		return data;
	} else {
		const errors = await res.json();
		return errors;
	}
};

//Initial state
const initialState = {};

//Reducer
export default function charactersReducer(state = initialState, action) {
	const userAdventureAfterChange = { ...action.payload };
	switch (action.type) {
		case ADD_NEW_ADVENTURE:
			return { ...userAdventureAfterChange };
		case CLEAR_ADVENTURE:
			return {};
		case UPDATE_ADVENTURE:
			return { ...userAdventureAfterChange };
		case GET_CURRENT_ADVENTURE:
			return { ...userAdventureAfterChange };
		default:
			return state;
	}
}
