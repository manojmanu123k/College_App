// Init
const initialState = {
  profile: null
};

// Reducer
export default function ProfileReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_PROFILE_SUCCESS:
      return { ...state, profile: action.payload };
    case types.UPDATE_PROFILE_SUCCESS:
      return { ...state, profile: action.payload };
    case types.RESET_PROFILE:
      return { ...state, profile: null };
    default:
      return state;
  }
}
