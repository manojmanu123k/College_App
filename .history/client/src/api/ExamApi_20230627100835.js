import axios from 'axios';

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
        exam.course = courses.find(course => course._id === exam._course);
        exam.students = students.filter(student => student._exam === exam._id);
        exam.teachers = teachers.filter(teacher => teacher._exam === exam._id);
      });

      return exams;
    } catch (error) {
      throw error;
    }
  }

  // Rest of the code...
}

export default ExamApi;
