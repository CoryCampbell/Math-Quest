// constants
const GET_USER_CHARACTERS = "session/GET_USER_CHARACTERS";
const GET_SELECTED_CHARACTER = "session/GET_SELECTED_CHARACTER";

// Action Creators
const getUserCharacters = (payload) => ({
	type: GET_USER_CHARACTERS,
	payload
});

const getSelectedCharacter = (payload) => ({
	type: GET_SELECTED_CHARACTER,
	payload
});

//Thunks
export const getUserCharactersThunk = () => async (dispatch) => {
	const res = await fetch("/api/characters/all");

	const data = await res.json();
	console.log("daaata", data);
	dispatch(getUserCharacters(data));
	return data;
};

export const getSelectedCharacterThunk = (character_name) => async (dispatch) => {
	const res = await fetch("/api/characters/all");

	const data = await res.json();
	console.log("data", data);

	//choose the character
	const selectedCharacter = data.filter((character) => (character.character_name = character_name))[0];

	console.log("selectedCharacter", selectedCharacter);

	dispatch(getSelectedCharacter(selectedCharacter));
	return selectedCharacter;
};

//Initial state
const initialState = { userCharacters: null, selectedCharacter: null };

//Reducer
export default function charactersReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USER_CHARACTERS:
			return { ...state, userCharacters: action.payload };
		case GET_SELECTED_CHARACTER:
			return { ...state, selectedCharacter: action.payload };
		default:
			return state;
	}
}
