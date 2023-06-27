// Dependencies
import * as types from "../actionTypes";

// Init
const initialState = {
  student: null,
  listExam: [],
  listCourse: []
};

// Reducer
export default function studentEditReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here
    
    // START REDUCERS
    case types.CREATE_STUDENT_SUCCESS:
    case types.UPDATE_STUDENT_SUCCESS:
    case types.GET_STUDENT_SUCCESS:
      return { ...state, student: action.payload };
    case types.FINDBY_STUDENT_EXAM_SUCCESS:
      return { ...state, listExam: action.payload };
    case types.LIST_COURSE_SUCCESS:
      return { ...state, listCourse: action.payload };
    // END REDUCERS
    
    default:
      return state;
  }
}
