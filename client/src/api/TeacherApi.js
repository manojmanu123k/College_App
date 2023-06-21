import CourseModel from "../models/Test_db/CourseModel"; // Update the import path
import StudentModel from "../models/Test_db/StudentModel"; // Update the import path
import TeacherModel from "../models/Test_db/TeacherModel"; // Update the import path




class TeacherApi {
  // Get Teacher List
  static getTeacherList() {
    return fetch("http://localhost:3000/api/teachers")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  // Get Teacher Details
  static getTeacherDetails(teacherId) {
    return fetch(`http://localhost:3000/api/teachers/${teacherId}`)
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  // Get Courses of a Teacher
  static getTeacherCourses(teacherId) {
    return TeacherModel.findById(teacherId)
      .populate("_courses")
      .exec()
      .then(teacher => teacher._courses);
  }

  // Get Students of a Teacher
  static getTeacherStudents(teacherId) {
    return TeacherModel.findById(teacherId)
      .populate("_students")
      .exec()
      .then(teacher => teacher._students);
  }

  // Add Teacher
  static addTeacher(teacherData) {
    const teacher = new TeacherModel(teacherData);
    return teacher.save();
  }

  // Update Teacher
  static updateTeacher(teacherId, teacherData) {
    return fetch(`http://localhost:3000/api/teachers/${teacherId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(teacherData)
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  // Delete Teacher
  static deleteTeacher(teacherId) {
    return fetch(`http://localhost:3000/api/teachers/${teacherId}`, {
      method: "DELETE"
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }
}

export default TeacherApi;
