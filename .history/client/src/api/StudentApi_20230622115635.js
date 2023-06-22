import axios from 'axios';
import CourseApi from './CourseApi';
import ExamApi from './ExamApi';
import CourseModel from '../models/Test_db/CourseModel';
import StudentModel from '../models/Test_db/StudentModel';
import TeacherModel from '../models/Test_db/TeacherModel';
//import properties from "../config/properties";

class StudentApi {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getStudentList() {
    try {
      const response = await axios.get(`${this.endpoint}/students`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getStudentDetails(studentId) {
    try {
      const response = await axios.get(`${this.endpoint}/students/${studentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getStudentCourses(studentId) {
    try {
      const courseApi = new CourseApi(this.endpoint);
      const courses = await courseApi.getCourseList();
      return courses.filter(course => course.students.includes(studentId));
    } catch (error) {
      throw error;
    }
  }

  async getStudentExams(studentId) {
    try {
      const examApi = new ExamApi(this.endpoint);
      const exams = await examApi.getExamList();
      return exams.filter(exam => exam.students.includes(studentId));
    } catch (error) {
      throw error;
    }
  }

  async addStudent(studentData) {
    try {
      const response = await axios.post(`${this.endpoint}/students`, studentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateStudent(studentId, studentData) {
    try {
      const response = await axios.put(`${this.endpoint}/students/${studentId}`, studentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(studentId) {
    try {
      const response = await axios.delete(`${this.endpoint}/students/${studentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

function constructApiUrl(endpoint, path) {
  return `${endpoint}${path}`;
}

export { StudentApi, constructApiUrl };
export default StudentApi;
