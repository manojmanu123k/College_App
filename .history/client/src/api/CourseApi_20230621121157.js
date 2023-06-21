import axios from 'axios';
import CourseModel from "../models/Test_db/CourseModel";
import StudentModel from "../models/Test_db/StudentModel";
import TeacherModel from "../models/Test_db/TeacherModel";
import properties from "../config/properties";

class CourseApi extends CourseApiGenerated {
  static async getCourseExams(courseId) {
    try {
      const exams = await ExamApi.getExamList(); // Remove this line if ExamApi is not used
      return exams.filter(exam => exam.courseId === courseId);
    } catch (error) {
      throw error;
    }
  }

  static async getCourseStudents(courseId) {
    try {
      const students = await StudentApi.getStudentList(); // Remove this line if StudentApi is not used
      return students.filter(student => student.courseId === courseId);
    } catch (error) {
      throw error;
    }
  }

  static async getCourseTeachers(courseId) {
    try {
      const teachers = await TeacherApi.getTeacherList(); // Remove this line if TeacherApi is not used
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

export default CourseApi;
