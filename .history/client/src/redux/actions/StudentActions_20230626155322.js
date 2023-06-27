import * as types from "../actionTypes";
import studentApi from "../../api/StudentApi";

export const deleteStudent = (id) => {
  return {
    type: types.DELETE_STUDENT,
    payload: id
  };
};

export const listStudents = () => {
  return function(dispatch) {
    console.log("This is my custom function");
    return studentApi
      .getStudentList()
      .then(list => {
        dispatch(loadStudentSuccess(list));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const loadStudentSuccess = (studentList) => {
  return { type: types.LIST_STUDENT_SUCCESS, studentList };
};

export default {
  deleteStudent,
  listStudents,
  loadStudentSuccess
};
