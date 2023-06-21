// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  listTeacher: []
};

// Reducer
export default function teacherListReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here

    // START REDUCERS
    case types.DELETE_TEACHER_SUCCESS:
      return { ...state, teacher: action.payload };
    case types.LIST_TEACHER_SUCCESS:
      return { ...state, listTeacher: action.payload };
    // END REDUCERS

    default:
      return state;
  }
}
