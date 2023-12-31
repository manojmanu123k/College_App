import * as types from "../actionTypes";

// Initial State
const initialState = {
  course: {},
  listExam: [],
  listTeacher: [],
  listStudent: []
};

// Reducer
export default function courseEditReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here

    // START REDUCERS
    case types.CREATE_COURSE_SUCCESS:
      return { ...state, course: action.payload };
    case types.UPDATE_COURSE_SUCCESS:
      return { ...state, course: action.payload };
    case types.GET_COURSE_SUCCESS:
      return { ...state, course: action.payload };
    case types.FINDBY_COURSE_EXAM_SUCCESS:
      return { ...state, listExam: action.payload };
    case types.FINDBY_COURSES_TEACHER_SUCCESS:
      return { ...state, listTeacher: action.payload };
    case types.FINDBY_COURSES_STUDENT_SUCCESS:
      return { ...state, listStudent: action.payload };
    // END REDUCERS

    default:
      return state;
  }
}
