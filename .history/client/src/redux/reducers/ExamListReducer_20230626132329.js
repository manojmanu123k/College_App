import * as types from "../actionTypes";

// Initial State
const initialState = {
  listExam: [],
};

// Reducer
export default function examListReducer(state = initialState, action) {
  switch (action.type) {
    case types.LIST_EXAM_SUCCESS:
      return { ...state, listExam: action.payload };
    default:
      return state;
  }
}
