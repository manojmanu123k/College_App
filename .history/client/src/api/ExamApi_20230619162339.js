import CourseApi from "./CourseApi";
import StudentApi from "./StudentApi";
import TeacherApi from "./TeacherApi";
import CourseModel from "../models/Test_db/CourseModel"; // Update the import path
import StudentModel from "../models/Test_db/StudentModel"; // Update the import path
import TeacherModel from "../models/Test_db/TeacherModel"; // Update the import path


class ExamApi extends ExamApiGenerated {
  // Get Exam List
  // Get Exam List
static getExamList() {
  return fetch("http://localhost:3000/api/exams")
    .then(response => {
      return response.json();
    })
    .then(exams => {
      const coursePromise = CourseApi.getCourseList();
      const studentPromise = StudentApi.getStudentList();
      const teacherPromise = TeacherApi.getTeacherList();

      return Promise.all([coursePromise, studentPromise, teacherPromise])
        .then(([courses, students, teachers]) => {
          exams.forEach(exam => {
            exam.course = courses.find(course => course.id === exam.courseId);
            exam.students = students.filter(student => student.examId === exam.id);
            exam.teachers = teachers.filter(teacher => teacher.examId === exam.id);
          });
          return exams;
        });
    })
    .catch(error => {
      throw error;
    });
}


  // Get Exam Details
  // Get Exam Details
static getExamDetails(examId) {
  return fetch(`http://localhost:3000/api/exams/${examId}`)
    .then(response => {
      return response.json();
    })
    .then(exam => {
      const coursePromise = CourseApi.getCourseDetails(exam.courseId);
      const studentPromise = StudentApi.getStudentsByExam(examId);
      const teacherPromise = TeacherApi.getTeachersByExam(examId);

      return Promise.all([coursePromise, studentPromise, teacherPromise])
        .then(([course, students, teachers]) => {
          exam.course = course;
          exam.students = students;
          exam.teachers = teachers;
          return exam;
        });
    })
    .catch(error => {
      throw error;
    });
}


  // Add Exam
  static addExam(examData) {
    return fetch("http://localhost:3000/api/exams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(examData)
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  // Update Exam
  static updateExam(examId, examData) {
    return fetch(`http://localhost:3000/api/exams/${examId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(examData)
    })
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  // Delete Exam
  static deleteExam(examId) {
    return fetch(`http://localhost:3000/api/exams/${examId}`, {
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

export default ExamApi;
