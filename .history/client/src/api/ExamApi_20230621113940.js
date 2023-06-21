import axios from 'axios';
import CourseApi from "./CourseApi";
import StudentApi from "./StudentApi";
import TeacherApi from "./TeacherApi";
import CourseModel from "../models/Test_db/CourseModel"; // Update the import path
import StudentModel from "../models/Test_db/StudentModel"; // Update the import path
import TeacherModel from "../models/Test_db/TeacherModel"; // Update the import path


class ExamApi extends ExamApiGenerated {
  static apiUrl = "http://localhost:3000/api";

  static async getExamList() {
    try {
      const response = await axios.get(`${this.apiUrl}/exams`);
      const exams = response.data;

      const [courses, students, teachers] = await Promise.all([
        this.getCourseList(),
        this.getStudentList(),
        this.getTeacherList()
      ]);

      exams.forEach(exam => {
        exam.course = courses.find(course => course.id === exam.courseId);
        exam.students = students.filter(student => student.examId === exam.id);
        exam.teachers = teachers.filter(teacher => teacher.examId === exam.id);
      });

      return exams;
    } catch (error) {
      throw error;
    }
  }

  static async getExamDetails(examId) {
    try {
      const response = await axios.get(`${this.apiUrl}/exams/${examId}`);
      const exam = response.data;

      const [course, students, teachers] = await Promise.all([
        this.getCourseDetails(exam.courseId),
        this.getStudentsByExam(examId),
        this.getTeachersByExam(examId)
      ]);

      exam.course = course;
      exam.students = students;
      exam.teachers = teachers;

      return exam;
    } catch (error) {
      throw error;
    }
  }

  static async addExam(examData) {
    try {
      const response = await axios.post(`${this.apiUrl}/exams`, examData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateExam(examId, examData) {
    try {
      const response = await axios.put(`${this.apiUrl}/exams/${examId}`, examData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteExam(examId) {
    try {
      const response = await axios.delete(`${this.apiUrl}/exams/${examId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCourseList() {
    try {
      const response = await axios.get(`${this.apiUrl}/courses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getStudentList() {
    try {
      const response = await axios.get(`${this.apiUrl}/students`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTeacherList() {
    try {
      const response = await axios.get(`${this.apiUrl}/teachers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getCourseDetails(courseId) {
    try {
      const response = await axios.get(`${this.apiUrl}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getStudentsByExam(examId) {
    try {
      const response = await axios.get(`${this.apiUrl}/exams/${examId}/students`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTeachersByExam(examId) {
    try {
      const response = await axios.get(`${this.apiUrl}/exams/${examId}/teachers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ExamApi;

export default ExamApi;