import axios from 'axios';
import CourseApi from "./CourseApi";
import StudentApi from "./StudentApi";
import TeacherApi from "./TeacherApi";
import CourseModel from "../models/Test_db/CourseModel"; // Update the import path
import StudentModel from "../models/Test_db/StudentModel"; // Update the import path
import TeacherModel from "../models/Test_db/TeacherModel"; // Update the import path


class ExamApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.apiUrl = process.env.API_URL || "http://localhost:3000/api";
  }

  async getExamList() {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams`);
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
      this.handleError(error);
    }
  }

  async getExamDetails(examId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams/${examId}`);
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
      this.handleError(error);
    }
  }

  async addExam(examData) {
    try {
      const response = await this.httpClient.post(`${this.apiUrl}/exams`, examData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateExam(examId, examData) {
    try {
      const response = await this.httpClient.put(`${this.apiUrl}/exams/${examId}`, examData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteExam(examId) {
    try {
      const response = await this.httpClient.delete(`${this.apiUrl}/exams/${examId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCourseList() {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/courses`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getStudentList() {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/students`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTeacherList() {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/teachers`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCourseDetails(courseId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getStudentsByExam(examId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams/${examId}/students`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTeachersByExam(examId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams/${examId}/teachers`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    throw error;
  }
}

class HttpClient {
  constructor() {
    this.client = axios.create();
  }

  async get(url) {
    try {
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(url, data) {
    try {
      const response = await this.client.post(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async put(url, data) {
    try {
      const response = await this.client.put(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(url) {
    try {
      const response = await this.client.delete(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    throw error;
  }
}

class CourseApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.apiUrl = process.env.API_URL || "http://localhost:3000/api";
  }

  async getCourseList() {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/courses`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getCourseDetails(courseId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    throw error;
  }
}

class StudentApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.apiUrl = process.env.API_URL || "http://localhost:3000/api";
  }

  async getStudentList() {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/students`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getStudentsByExam(examId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams/${examId}/students`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    throw error;
  }
}

class TeacherApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.apiUrl = process.env.API_URL || "http://localhost:3000/api";
  }

  async getTeacherList() {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/teachers`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getTeachersByExam(examId) {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams/${examId}/teachers`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    throw error;
  }
}

const httpClient = new HttpClient();
const examApi = new ExamApi(httpClient);
const courseApi = new CourseApi(httpClient);
const studentApi = new StudentApi(httpClient);
const teacherApi = new TeacherApi(httpClient);

export { examApi, courseApi, studentApi, teacherApi };



export default ExamApi;