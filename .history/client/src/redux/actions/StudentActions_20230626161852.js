import * as types from "../actionTypes";
import studentApi from "../../api/StudentApi";
import courseApi from "../../api/CourseApi";

export const deleteStudent = (id) => {
  return {
    type: types.DELETE_STUDENT_SUCCESS,
    payload: id
  };
};

export const listStudents = () => {
  return function(dispatch) {
    console.log("This is my custom function");
    return Promise.all([
      studentApi.getStudentList(),
      courseApi.getCourseList()
    ])
      .then(([studentList, courseList]) => {
        dispatch(loadStudentSuccess(studentList));
        dispatch(loadCourseSuccess(courseList));
      })
      .catch(error => {
        throw error;
      });
  };
};


export const loadCourseSuccess = (courseList) => {
  return { type: types.LIST_COURSE_SUCCESS, payload: courseList };
};

export const loadStudentSuccess = (student) => {
  return { type: types.GET_STUDENT_SUCCESS, payload: student };
};

export default {
  deleteStudent,
  listStudents,
  loadStudentSuccess
};
