import axios from 'axios';

class TeacherApi {
  static async getTeacherList() {
    try {
      const response = await axios.get(`${process.env.API_URL}/teachers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTeacherDetails(teacherId) {
    try {
      const response = await axios.get(`${process.env.API_URL}/teachers/${teacherId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTeacherCourses(teacherId) {
    try {
      const response = await axios.get(`${process.env.API_URL}/teachers/${teacherId}/courses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getTeacherStudents(teacherId) {
    try {
      const response = await axios.get(`${process.env.API_URL}/teachers/${teacherId}/students`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async addTeacher(teacherData) {
    try {
      const response = await axios.post(`${process.env.API_URL}/teachers`, teacherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async updateTeacher(teacherId, teacherData) {
    try {
      const response = await axios.put(`${process.env.API_URL}/teachers/${teacherId}`, teacherData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTeacher(teacherId) {
    try {
      const response = await axios.delete(`${process.env.API_URL}/teachers/${teacherId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default TeacherApi;
