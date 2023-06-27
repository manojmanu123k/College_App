import axios from 'axios';
import CourseApi from './CourseApi';
import StudentApi from './StudentApi';
import TeacherApi from './TeacherApi';

class ExamApi {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.API_URL || 'http://localhost:3000/api',
    });
  }

  async getExams() {
    try {
      const response = await this.httpClient.get('/exams');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getExamList() {
    try {
      const exams = await this.getExams();

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

  // Rest of the code...
}

export default ExamApi;
