import * as types from "../actionTypes";
import studentApi from "../../api/StudentApi";

export const deleteStudent = (id) => {
  return {
    type: "DELETE_STUDENT",
    payload: id
  };
};

export const listStudents = () => {
  return function(dispatch) {
    console.log("This is my custom function");
    return Promise.all([
      studentApi.getStudentList(),
      courseApi.getCourseList() // Add this line to fetch the course list
    ])
      .then(([studentList, courseList]) => {
        dispatch(loadStudentSuccess(studentList));
        dispatch(loadCourseSuccess(courseList)); // Add this dispatch to load the course list
      })
      .catch(error => {
        throw error;
      });
  };
};


export const loadCourseSuccess = (courseList) => {
  return { type: "LIST_COURSE_SUCCESS", payload: courseList };
};


export default {
  deleteStudent,
  listStudents,
  loadStudentSuccess
};
