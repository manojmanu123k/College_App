import * as types from "../actionTypes";
import StudentApi from "../api/StudentApi";

const actions = {
  // Create student
  createStudent: (student) => {
    return (dispatch) => {
      return StudentApi.createStudent(student)
        .then((createdStudent) => {
          dispatch(actions.createStudentSuccess(createdStudent));
        })
        .catch((error) => {
          throw error;
        });
    };
  },

  createStudentSuccess: (student) => {
    return { type: types.CREATE_STUDENT_SUCCESS, payload: student };
  },

  // Delete student
  deleteStudent: (id) => {
    return (dispatch) => {
      return StudentApi.deleteStudent(id)
        .then((deletedStudent) => {
          dispatch(actions.deleteStudentSuccess(deletedStudent));
        })
        .catch((error) => {
          throw error;
        });
    };
  },

  deleteStudentSuccess: (student) => {
    return { type: types.DELETE_STUDENT_SUCCESS, payload: student };
  },

  // Find students by courses
  findByCourses: (key) => {
    return (dispatch) => {
      return StudentApi.findByCourses(key)
        .then((students) => {
          dispatch(actions.findByCoursesSuccess(students));
        })
        .catch((error) => {
          throw error;
        });
    };
  },

  findByCoursesSuccess: (students) => {
    return { type: types.FINDBY_COURSES_STUDENT_SUCCESS, payload: students };
  },

  // Get student
  getStudent: (id) => {
    return (dispatch) => {
      return StudentApi.getOneStudent(id)
        .then((student) => {
          dispatch(actions.getStudentSuccess(student));
        })
        .catch((error) => {
          throw error;
        });
    };
  },

  getStudentSuccess: (student) => {
    return { type: types.GET_STUDENT_SUCCESS, payload: student };
  },

  // Load student list
  loadStudentList: () => {
    return (dispatch) => {
      return StudentApi.getStudentList()
        .then((studentList) => {
          dispatch(actions.loadStudentListSuccess(studentList));
        })
        .catch((error) => {
          throw error;
        });
    };
  },

  loadStudentListSuccess: (studentList) => {
    return { type: types.LIST_STUDENT_SUCCESS, payload: studentList };
  },

  // Save student
  saveStudent: (student) => {
    return (dispatch) => {
      return StudentApi.saveStudent(student)
        .then((savedStudent) => {
          dispatch(actions.saveStudentSuccess(savedStudent));
        })
        .catch((error) => {
          throw error;
        });
    };
  },

  saveStudentSuccess: (student) => {
    return { type: types.UPDATE_STUDENT_SUCCESS, payload: student };
  },
};

export default actions;
