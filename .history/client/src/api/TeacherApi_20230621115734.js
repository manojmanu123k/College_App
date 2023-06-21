import CourseModel from "../models/Test_db/CourseModel"; // Update the import path
import StudentModel from "../models/Test_db/StudentModel"; // Update the import path
import TeacherModel from "../models/Test_db/TeacherModel"; // Update the import path
import config from './config';

class TeacherApi {
  // Get Teacher List
  static async getTeacherList() {
    try {
      const response = await fetch(`${config.apiUrl}/teachers`);
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  // Get Teacher Details
  static async getTeacherDetails(teacherId) {
    try {
      const response = await fetch(`${config.apiUrl}/teachers/${teacherId}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  // Get Courses of a Teacher
  static async getTeacherCourses(teacherId) {
    try {
      const teacher = await TeacherModel.findById(teacherId)
        .populate("_courses")
        .exec();
      return teacher._courses;
    } catch (error) {
      throw error;
    }
  }

  // Get Students of a Teacher
  static async getTeacherStudents(teacherId) {
    try {
      const teacher = await TeacherModel.findById(teacherId)
        .populate("_students")
        .exec();
      return teacher._students;
    } catch (error) {
      throw error;
    }
  }

  // Add Teacher
  static async addTeacher(teacherData) {
    try {
      const teacher = new TeacherModel(teacherData);
      return teacher.save();
    } catch (error) {
      throw error;
    }
  }

  // Update Teacher
  static async updateTeacher(teacherId, teacherData) {
    try {
      const response = await fetch(`${config.apiUrl}/teachers/${teacherId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(teacherData)
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  // Delete Teacher
  static async deleteTeacher(teacherId) {
    try {
      const response = await fetch(`${config.apiUrl}/teachers/${teacherId}`, {
        method: "DELETE"
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}

export default TeacherApi;

// config.js
const config = {
  apiUrl: process.env.API_URL || "http://localhost:3000/api"
};

export default config;
