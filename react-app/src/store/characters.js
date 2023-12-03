// constants
const GET_USER_CHARACTERS = "session/GET_USER_CHARACTERS";
const GET_SELECTED_CHARACTER = "session/GET_SELECTED_CHARACTER";

// Action Creators
const getUserCharacters = (payload) => ({
	type: GET_USER_CHARACTERS,
	payload
});

//Thunks
export const getUserCharactersThunk = () => async (dispatch) => {
	const res = await fetch("/api/characters/all");

	const data = await res.json();
	dispatch(getUserCharacters(data));
	return data;
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
