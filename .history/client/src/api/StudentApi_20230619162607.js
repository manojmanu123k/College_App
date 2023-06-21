import axios from "axios";
import { properties } from "../config/properties";
import CourseApi from "./CourseApi";
import ExamApi from "./ExamApi";
import CourseModel from "../models/Test_db/CourseModel"; // Update the import path
import StudentModel from "../models/Test_db/StudentModel"; // Update the import path
import TeacherModel from "../models/Test_db/TeacherModel"; // Update the import path


class StudentApi {
  // Get Student List
  static getStudentList() {
    return axios
      .get(properties.endpoint + "/students")
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Get Student Details
  static getStudentDetails(studentId) {
    return axios
      .get(properties.endpoint + `/students/${studentId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Get Student Courses
  static getStudentCourses(studentId) {
    return CourseApi.getCourseList()
      .then(courses => {
        return courses.filter(course => course.students.includes(studentId));
      })
      .catch(error => {
        throw error;
      });
  }

  // Get Student Exams
  static getStudentExams(studentId) {
    return ExamApi.getExamList()
      .then(exams => {
        return exams.filter(exam => exam.students.includes(studentId));
      })
      .catch(error => {
        throw error;
      });
  }

  // Add Student
  static addStudent(studentData) {
    return axios
      .post(properties.endpoint + "/students", studentData)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Update Student
  static updateStudent(studentId, studentData) {
    return axios
      .put(properties.endpoint + `/students/${studentId}`, studentData)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Delete Student
  static deleteStudent(studentId) {
    return axios
      .delete(properties.endpoint + `/students/${studentId}`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default StudentApi;
