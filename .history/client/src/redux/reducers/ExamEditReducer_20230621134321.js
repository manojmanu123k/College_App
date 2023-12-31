import * as types from "../actionTypes";

// Initial State
const initialState = {
  exam: {},
  listStudent: [],
  listCourse: [],
  listTeacher: [],
  validate: {}
};

// Reducer
export default function examEditReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here

    // START REDUCERS
    case types.CREATE_EXAM_SUCCESS:
      return { ...state, exam: action.payload };
    case types.UPDATE_EXAM_SUCCESS:
      return { ...state, exam: action.payload };
    case types.GET_EXAM_SUCCESS:
      return { ...state, exam: action.payload };
    case types.LIST_STUDENT_SUCCESS:
      return { ...state, listStudent: action.payload };
    case types.LIST_COURSE_SUCCESS:
      return { ...state, listCourse: action.payload };
    case types.LIST_TEACHER_SUCCESS:
      return { ...state, listTeacher: action.payload };
    case types.VALIDATE_EXAM_SUCCESS:
      return { ...state, validate: action.payload };
    // END REDUCERS

    default:
      return state;
  }
}
