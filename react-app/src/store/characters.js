// constants
const GET_USER_CHARACTERS = "characters/getUserCharacters";
const GET_SELECTED_CHARACTER = "characters/getSelectedCharacter";
const ADD_NEW_CHARACTER = "characters/addNewCharacter";
const DELETE_CHARACTER = "characters/deleteCharacter";

// Action Creators
const getUserCharacters = (payload) => ({
	type: GET_USER_CHARACTERS,
	payload
});

const getSelectedCharacter = (payload) => ({
	type: GET_SELECTED_CHARACTER,
	payload
});

const addNewCharacter = (payload) => ({
	type: ADD_NEW_CHARACTER,
	payload
});

const deleteCharacter = (character_id) => ({
	type: DELETE_CHARACTER,
	character_id
});

//Thunks

//
//get user characters thunk
//
export const getUserCharactersThunk = () => async (dispatch) => {
	const res = await fetch("/api/characters/all");

	const data = await res.json();
	dispatch(getUserCharacters(data));
	return data;
};

//
//get selected character thunk
//
export const getSelectedCharacterThunk = () => async (dispatch) => {
	const res = await fetch("/api/characters/all");
	const data = await res.json();
	const characterName = localStorage.getItem("character_name");

	//choose the character
	const selectedCharacter = data.filter((character) => character.character_name === characterName)[0];

	dispatch(getSelectedCharacter(selectedCharacter));
	return selectedCharacter;
};

//
//add new character thunk
//
export const addNewCharacterThunk = (character_name, appearance, user_id) => async (dispatch) => {
	const res = await fetch(`/api/characters/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			character_name,
			appearance,
			user_id,
			difficulty: 1,
			level: 1,
			max_health: 100,
			current_health: 100,
			experience_points: 0,
			coins: 0
		})
	});

	const data = await res.json();
	dispatch(addNewCharacter(data));
	return data;
};

//
//DELETE A CHARACTER THUNK
//
export const deleteCharacterThunk = (character_id) => async (dispatch) => {
	const res = await fetch(`/api/characters/delete`, {
		method: "DELETE"
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(deleteCharacter(character_id));
	} else {
		const errors = await res.json();
		return errors;
	}
};

//Initial state
const initialState = { userCharacters: null, selectedCharacter: null };

//Reducer
export default function charactersReducer(state = initialState, action) {
	const userCharactersAfterChange = { ...state.userCharacters };
	// const userCharactersAfterDeletion = { ...state.userCharacters };
	switch (action.type) {
		case GET_USER_CHARACTERS:
			return { ...state, userCharacters: action.payload };
		case GET_SELECTED_CHARACTER:
			return { ...state, selectedCharacter: action.payload };
		case ADD_NEW_CHARACTER:
			return { ...state, userCharacters: [userCharactersAfterChange] };
		case DELETE_CHARACTER:
			return { ...state, userCharacters: [userCharactersAfterChange] };
		default:
			return state;
	}
}
