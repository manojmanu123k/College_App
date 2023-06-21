import * as types from "../actionTypes";

// Initial State
const initialState = {
  listExam: []
};

// Reducer
export default function examListReducer(state = initialState, action) {
  switch (action.type) {
    // Insert your custom reducers here

    // START REDUCERS
    case types.DELETE_EXAM_SUCCESS:
      return { ...state, exam: action.payload };
    case types.LIST_EXAM_SUCCESS:
      return { ...state, listExam: action.payload };
    // END REDUCERS

    default:
      return state;
  }
}
