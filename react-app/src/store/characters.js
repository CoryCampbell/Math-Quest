// constants
const GET_USER_CHARACTERS = "characters/getUserCharacters";
const GET_SELECTED_CHARACTER = "characters/getSelectedCharacter";
const ADD_NEW_CHARACTER = "characters/addNewCharacter";
const DELETE_CHARACTER = "characters/deleteCharacter";
const UPDATE_CHARACTER = "characters/updateCharacter";
const UPDATE_EXPERIENCE = "characters/updateExperience";
const CLEAR_CHARACTERS = "characters/clearCharacters";

// Action Creators
const getUserCharacters = (payload) => ({
	type: GET_USER_CHARACTERS,
	payload
});

const getSelectedCharacter = (payload) => ({
	type: GET_SELECTED_CHARACTER,
	payload
});

const clearCharacters = () => ({
	type: CLEAR_CHARACTERS
});

const addNewCharacter = (payload) => ({
	type: ADD_NEW_CHARACTER,
	payload
});

const deleteCharacter = (character_id) => ({
	type: DELETE_CHARACTER,
	character_id
});

const updateCharacter = (oldCharacterName, newCharacterName) => ({
	type: UPDATE_CHARACTER,
	oldCharacterName,
	newCharacterName
});

const updateExperience = (character_id, experience_points_gained) => ({
	type: UPDATE_EXPERIENCE,
	character_id,
	experience_points_gained
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
// clear characters state
//
export const clearCharactersThunk = () => async (dispatch) => {
	dispatch(clearCharacters());
	return;
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
	const res = await fetch(`/api/characters/${character_id}/delete`, {
		method: "DELETE"
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(deleteCharacter(character_id));
		return data;
	} else {
		const errors = await res.json();
		return errors;
	}
};

//
//UPDATE A CHARACTER THUNK
//
export const updateCharacterThunk = (oldCharacterName, newCharacterName) => async (dispatch) => {
	const res = await fetch(`/api/characters/${oldCharacterName}/${newCharacterName}`, {
		method: "PATCH"
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(updateCharacter(oldCharacterName, newCharacterName));
		return data;
	} else {
		const errors = await res.json();
		return errors;
	}
};
//
//UPDATE EXPERIENCE POINTS
//
export const updateExperienceThunk = (character_id, experience_points_gained) => async (dispatch) => {
	const res = await fetch(`/api/characters/experience/${character_id}/${experience_points_gained}`, {
		method: "PATCH"
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(updateExperience(character_id, experience_points_gained));
		return data;
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

	switch (action.type) {
		case GET_USER_CHARACTERS:
			return { ...state, userCharacters: action.payload };
		case GET_SELECTED_CHARACTER:
			return { ...state, selectedCharacter: action.payload };
		case CLEAR_CHARACTERS:
			return initialState;
		case ADD_NEW_CHARACTER:
			return { ...state, userCharacters: [userCharactersAfterChange] };
		case DELETE_CHARACTER:
			console.log("============> ACTION: ", action);
			return { ...state, userCharacters: [userCharactersAfterChange] };
		case UPDATE_CHARACTER:
			return { ...state, userCharacters: [userCharactersAfterChange] };
		default:
			return state;
	}
}
