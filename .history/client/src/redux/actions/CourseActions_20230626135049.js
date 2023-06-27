import * as actionTypes from "./actionTypes";
import courseApi from "../../api/CourseApi";

export function loadCourseList() {
  return function (dispatch) {
    console.log("This is my custom function");
    return courseApi
      .getCourses()
      .then((list) => {
        dispatch(loadCourseSuccess(list));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function loadCourseSuccess(courseList) {
  return { type: actionTypes.LIST_COURSE_SUCCESS, courseList };
}

export function saveCourse(course) {
  return function (dispatch) {
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        dispatch(saveCourseSuccess(savedCourse));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourseSuccess(savedCourse) {
  return { type: actionTypes.CREATE_COURSE_SUCCESS, savedCourse };
}

export function deleteCourse(courseId) {
  return function (dispatch) {
    return courseApi
      .deleteCourse(courseId)
      .then(() => {
        dispatch(deleteCourseSuccess(courseId));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteCourseSuccess(courseId) {
  return { type: actionTypes.DELETE_COURSE_SUCCESS, courseId };
}
