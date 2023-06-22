import axios from 'axios';
import CourseApi from './CourseApi';
import StudentApi from './StudentApi';
import TeacherApi from './TeacherApi';
import properties from "../config/properties";
import CourseModel from '../models/Test_db/CourseModel';
import StudentModel from '../models/Test_db/StudentModel';
import TeacherModel from '../models/Test_db/TeacherModel';

class ExamApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.apiUrl = process.env.API_URL || 'http://localhost:3000/api';
  }

  async getExamList() {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams`);
      const exams = response.data;

      const [courses, students, teachers] = await Promise.all([
        CourseApi.getCourseList(),
        StudentApi.getStudentList(),
        TeacherApi.getTeacherList(),
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

  async getExamDetails(examId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams/${examId}`);
      const exam = response.data;

      const [course, students, teachers] = await Promise.all([
        CourseApi.getCourseDetails(exam.courseId),
        this.getStudentsByExam(examId),
        this.getTeachersByExam(examId),
      ]);

      exam.course = course;
      exam.students = students;
      exam.teachers = teachers;

      return exam;
    } catch (error) {
      throw error;
    }
  }

  async addExam(examData) {
    try {
      const response = await this.httpClient.post(`${this.apiUrl}/exams`, examData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateExam(examId, examData) {
    try {
      const response = await this.httpClient.put(`${this.apiUrl}/exams/${examId}`, examData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteExam(examId) {
    try {
      const response = await this.httpClient.delete(`${this.apiUrl}/exams/${examId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getStudentsByExam(examId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams/${examId}/students`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTeachersByExam(examId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams/${examId}/teachers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default ExamApi;
