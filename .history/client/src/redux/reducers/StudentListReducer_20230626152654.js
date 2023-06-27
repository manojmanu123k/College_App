import * as types from "../redux/actionTypes";

const initialState = {
  listStudent: []
};

export default function studentListReducer(state = initialState, action) {
  switch (action.type) {
    case types.DELETE_STUDENT_SUCCESS:
      return { ...state, student: action.payload };
    case types.LIST_STUDENT_SUCCESS:
      return { ...state, listStudent: action.payload };
    default:
      return state;
  }
}
