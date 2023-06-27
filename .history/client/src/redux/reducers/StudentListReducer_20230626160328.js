import * as types from "../actionTypes";

const initialState = {
  list: []
};

export default function studentListReducer(state = initialState, action) {
  switch (action.type) {
    case "DELETE_STUDENT":
      return { ...state, list: action.payload };
    case "LIST_STUDENT_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
