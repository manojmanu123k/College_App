import TeacherApi from "../../api/TeacherApi";
import * as types from "../actionTypes";

const loadTeacherListSuccess = (list) => {
  return {
    type: types.LIST_TEACHER_SUCCESS,
    payload: list
  };
};

const deleteTeacherSuccess = (teacher) => {
  return {
    type: types.DELETE_TEACHER_SUCCESS,
    payload: teacher
  };
};

const loadTeacherList = () => {
  return function(dispatch) {
    console.log("This is my custom function");
    return TeacherApi.getTeacherList()
      .then(list => {
        dispatch(loadTeacherListSuccess(list));
      })
      .catch(error => {
        throw error;
      });
  };
};

const deleteTeacher = (teacherId) => {
  return function(dispatch) {
    return TeacherApi.deleteTeacher(teacherId)
      .then(() => {
        dispatch(deleteTeacherSuccess(teacherId));
      })
      .catch(error => {
        throw error;
      });
  };
};

const TeacherActions = {
  loadTeacherList,
  deleteTeacher,
  // Add other actions here if needed
};

export default TeacherActions;
