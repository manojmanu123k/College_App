import axios from "axios";
import ExamApi from "./ExamApi";
import StudentApi from "./StudentApi";
import TeacherApi from "./TeacherApi";
import CourseApiGenerated from "./generated/CourseApiGenerated";

class CourseApi extends CourseApiGenerated {
  static async getCourseExams(courseId) {
    try {
      const exams = await ExamApi.getExamList();
      return exams.filter(exam => exam.courseId === courseId);
    } catch (error) {
      throw error;
    }
  }
  
  static async getCourses() {
    try {
      const response = await axios.get(`${process.env.API_URL}/courses`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch courses. Please try again later."); // Throw a custom error message
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

  static async getCourseDetails(courseId) {
    try {
      const response = await axios.get(`${process.env.API_URL}/courses/${courseId}`);
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
      const response = await axios.post(`${process.env.API_URL}/courses`, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateCourse(courseId, courseData) {
    try {
      const response = await axios.put(`${process.env.API_URL}/courses/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCourse(courseId) {
    try {
      const response = await axios.delete(`${process.env.API_URL}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default CourseApi;
