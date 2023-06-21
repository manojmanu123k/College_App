// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  teacher: {},
  listExam: [],
  listCourse: []
};

// Reducer
export default function teacherEditReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here

    // START REDUCERS
    case types.CREATE_TEACHER_SUCCESS:
    case types.UPDATE_TEACHER_SUCCESS:
    case types.GET_TEACHER_SUCCESS:
      return { ...state, teacher: action.payload };
    case types.FINDBY_TEACHER_EXAM_SUCCESS:
      return { ...state, listExam: action.payload };
    case types.LIST_COURSE_SUCCESS:
      return { ...state, listCourse: action.payload };
    // END REDUCERS

    default:
      return state;
  }
}
