import * as types from "../actionTypes";
import actionsFunction from "../actions/generated/StudentActionsGenerated";


const initialState = {
  student: {}
};

export default function studentEditReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_STUDENT_SUCCESS":
    case "CREATE_STUDENT_SUCCESS":
    case "UPDATE_STUDENT_SUCCESS":
      return { ...state, student: action.payload };
    case "FINDBY_STUDENT_EXAM_SUCCESS":
      return { ...state, student: action.payload.student };
    case "LIST_COURSE_SUCCESS":
      return { ...state, student: action.payload };
    default:
      return state;
  }
}
