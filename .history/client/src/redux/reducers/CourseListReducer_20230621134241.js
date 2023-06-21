import * as types from "../actionTypes";

// Initial State
const initialState = {
  listCourse: []
};

// Reducer
export default function courseListReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here

    // START REDUCERS
    case types.DELETE_COURSE_SUCCESS:
      return { ...state, course: action.payload };
    case types.LIST_COURSE_SUCCESS:
      return { ...state, listCourse: action.payload };
    // END REDUCERS

    default:
      return state;
  }
}
