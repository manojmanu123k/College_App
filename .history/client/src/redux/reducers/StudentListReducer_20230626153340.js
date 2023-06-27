import * as types from "../actionTypes";

const initialState = {
  listStudent: []
};

export default function studentListReducer(state = initialState, action) {
  switch (action.type) {
    case types.DELETE_STUDENT_SUCCESS:
      return { ...state, listStudent: action.payload }; // Update the listStudent property
    case types.LIST_STUDENT_SUCCESS:
      return { ...state, listStudent: action.payload };
    default:
      return state;
  }
}
