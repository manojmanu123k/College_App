// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  listStudent: []
};

// Reducer
export default function studentListReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here

    // START REDUCERS
    case types.DELETE_STUDENT_SUCCESS:
      return { ...state, student: action.payload };
    case types.LIST_STUDENT_SUCCESS:
      return { ...state, listStudent: action.payload };
    // END REDUCERS

    default:
      return state;
  }
}
