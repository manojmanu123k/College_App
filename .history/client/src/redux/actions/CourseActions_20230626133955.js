import * as types from "./ActionTypes";
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
  return { type: types.LOAD_COURSE_SUCCESS, courseList };
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
  return { type: types.SAVE_COURSE_SUCCESS, savedCourse };
}

export function deleteCourse(courseId) {
  return function (dispatch) {
    return courseApi
      .deleteCourse(courseId)
      .then(() => {
        dispatch(deleteCourseOptimistic(courseId));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function deleteCourseOptimistic(courseId) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, courseId };
}
