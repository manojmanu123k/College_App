import axios from 'axios';
import ExamApi from "./api/ExamApi";
import StudentApi from "./api/StudentApi";
import TeacherApi from "./api/TeacherApi";
import CourseModel from "../models/Test_db/CourseModel"; // Update the import path
import StudentModel from "../models/Test_db/StudentModel"; // Update the import path
import TeacherModel from "../models/Test_db/TeacherModel"; // Update the import path



class CourseApi extends CourseApiGenerated {
  static async getCourseExams(courseId) {
    try {
      const exams = await ExamApi.getExamList();
      return exams.filter(exam => exam.courseId === courseId);
    } catch (error) {
      throw error;
    }
  }

  static async getCourseStudents(courseId) {
    try {
      const students = await StudentApi.getStudentList();
      return students.filter(student => student.courseId === courseId);
    } catch (error) {
      throw error;
    }
  }

  static async getCourseTeachers(courseId) {
    try {
      const teachers = await TeacherApi.getTeacherList();
      return teachers.filter(teacher => teacher.courseId === courseId);
    } catch (error) {
      throw error;
    }
  }

  static async getCourseList() {
    try {
      const response = await axios.get("http://localhost:3000/api/courses");
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCourseDetails(courseId) {
    try {
      const response = await axios.get(`http://localhost:3000/api/courses/${courseId}`);
      const course = response.data;

      const [exams, students, teachers] = await Promise.all([
        this.getCourseExams(courseId),
        this.getCourseStudents(courseId),
        this.getCourseTeachers(courseId)
      ]);

      course.exams = exams;
      course.students = students;
      course.teachers = teachers;

      return course;
    } catch (error) {
      throw error;
    }
  }

  static async addCourse(courseData) {
    try {
      const response = await axios.post("http://localhost:3000/api/courses", courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateCourse(courseId, courseData) {
    try {
      const response = await axios.put(`http://localhost:3000/api/courses/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCourse(courseId) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}



// Separate files for each API class (ExamApi, StudentApi, TeacherApi)
// API utility file for common API tasks
// Environment variables for API base URL can be set using a .env file or a configuration file.

export default CourseApi;