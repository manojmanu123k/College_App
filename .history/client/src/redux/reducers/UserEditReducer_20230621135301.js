// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  user: null
};

// Reducer
export default function UserEditReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here

    // START REDUCERS
    case types.GET_USER_SUCCESS:
      return { ...state, user: action.payload };
    // END REDUCERS

    default:
      return state;
  }
}
