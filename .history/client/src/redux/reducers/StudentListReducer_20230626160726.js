import * as types from "../actionTypes";

const initialState = {
  list: []
};

export default function courseListReducer(state = initialState, action) {
  switch (action.type) {
    case "LIST_COURSE_SUCCESS":
      return { ...state, list: action.payload };
    default:
      return state;
  }
}
  