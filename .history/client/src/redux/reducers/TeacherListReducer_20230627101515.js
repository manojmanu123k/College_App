import * as types from "../actionTypes";

const initialState = {
  list: []
};


const teacherListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DELETE_TEACHER_SUCCESS:
      return {
        ...state,
        listTeacher: state.listTeacher.filter(teacher => teacher.id !== action.payload)
      };
    case types.LIST_TEACHER_SUCCESS:
      return {
        ...state,
        listTeacher: action.payload
      };
    default:
      return state;
  }
};

export default teacherListReducer;
