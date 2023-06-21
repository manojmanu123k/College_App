import ExamApi from "./api/ExamApi";
import StudentApi from "./api/StudentApi";
import TeacherApi from "./api/TeacherApi";v
import CourseModel from "../models/Test_db/CourseModel"; // Update the import path
import StudentModel from "../models/Test_db/StudentModel"; // Update the import path
import TeacherModel from "../models/Test_db/TeacherModel"; // Update the import path



class CourseApi extends CourseApiGenerated {

  // Get Exams of a Course
static getCourseExams(courseId) {
  return ExamApi.getExamList()
    .then(exams => {
      return exams.filter(exam => exam.courseId === courseId);
    })
    .catch(error => {
      throw error;
    });
}

// Get Students of a Course
static getCourseStudents(courseId) {
  return StudentApi.getStudentList()
    .then(students => {
      return students.filter(student => student.courseId === courseId);
    })
    .catch(error => {
      throw error;
    });
}

// Get Teachers of a Course
static getCourseTeachers(courseId) {
  return TeacherApi.getTeacherList()
    .then(teachers => {
      return teachers.filter(teacher => teacher.courseId === courseId);
    })
    .catch(error => {
      throw error;
    });
}

  // Get Course List
  static getCourseList() {
    return fetch("http://localhost:3000/api/courses")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  // Get Course Details
  // Get Course Details
static getCourseDetails(courseId) {
  return fetch(`http://localhost:3000/api/courses/${courseId}`)
    .then(response => {
      return response.json();
    })
    .then(course => {
      const examPromise = this.getCourseExams(courseId);
      const studentPromise = this.getCourseStudents(courseId);
      const teacherPromise = this.getCourseTeachers(courseId);

      return Promise.all([examPromise, studentPromise, teacherPromise])
        .then(([exams, students, teachers]) => {
          course.exams = exams;
          course.students = students;
          course.teachers = teachers;
          return course;
        });
    })
    .catch(error => {
      throw error;
    });
}


  // Get Exams of a Course
  static getCourseExams(courseId) {
    return ExamApi.getExamList()
      .then(exams => {
        return exams.filter(exam => exam.courseId === courseId);
      })
      .catch(error => {
        throw error;
      });
  }

  // Add Course
  static addCourse(courseData) {
    return fetch("http://localhost:3000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(courseData)
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  // Update Course
  static updateCourse(courseId, courseData) {
    return fetch(`http://localhost:3000/api/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(courseData)
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  // Delete Course
  static deleteCourse(courseId) {
    return fetch(`http://localhost:3000/api/courses/${courseId}`, {
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

export default CourseApi;
