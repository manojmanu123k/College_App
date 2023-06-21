// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  listUser: []
};

// Reducer
export default function UserListReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here

    // START REDUCERS
    case types.LIST_USER_SUCCESS:
      return { ...state, listUser: action.payload };
    // END REDUCERS

    default:
      return state;
  }
}
