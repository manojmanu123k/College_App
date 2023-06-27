import * as types from "../actionTypes";
import studentApi from "../../api/StudentApi";

export function listStudents() {
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
}

export function loadStudentSuccess(studentList) {
  return { type: types.LIST_STUDENT_SUCCESS, payload: studentList };
}
