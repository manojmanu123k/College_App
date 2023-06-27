import axios from 'axios';
import CourseApi from './CourseApi';
import StudentApi from './StudentApi';
import TeacherApi from './TeacherApi';

class ExamApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.apiUrl = process.env.API_URL || 'http://localhost:3000/api';
  }

  async getExams() {
    try {
      const response = await this.httpClient.get(`${this.apiUrl}/exams`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Rest of the code...
}

export default ExamApi;
