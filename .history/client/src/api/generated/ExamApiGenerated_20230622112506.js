import axios from "axios";
import { properties } from "../../config/properties";

class ExamApiGenerated {
  static contextUrl = properties.endpoint + "/exam";

  // CRUD METHODS

  /**
   * createExam
   * @description CRUD ACTION create
   */
  static createExam(exam) {
    return axios
      .post(ExamApiGenerated.contextUrl, exam)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * deleteExam
   * @description CRUD ACTION delete
   * @param {ObjectId} id - Id
   */
  static deleteExam(id) {
    return axios
      .delete(ExamApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * findBy_course
   * @description CRUD ACTION findBy_course
   * @param {ObjectId} id - Id of model to search for
   */
  static findBy_course(id) {
    return axios
      .get(ExamApiGenerated.contextUrl + "/findBy_course/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * findBy_student
   * @description CRUD ACTION findBy_student
   * @param {ObjectId} id - Id of model to search for
   */
  static findBy_student(id) {
    return axios
      .get(ExamApiGenerated.contextUrl + "/findBy_student/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * findBy_teacher
   * @description CRUD ACTION findBy_teacher
   * @param {ObjectId} id - Id of model to search for
   */
  static findBy_teacher(id) {
    return axios
      .get(ExamApiGenerated.contextUrl + "/findBy_teacher/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getOneExam
   * @description CRUD ACTION get
   * @param {ObjectId} id - Id resource
   */
  static getOneExam(id) {
    return axios
      .get(ExamApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getExamList
   * @description CRUD ACTION list
   */
  static getExamList() {
    return axios
      .get(ExamApiGenerated.contextUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * saveExam
   * @description CRUD ACTION update
   * @param {ObjectId} id - Id
   */
  static saveExam(exam) {
    return axios
      .post(ExamApiGenerated.contextUrl + "/" + exam._id, exam)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Custom APIs
  /**
   * validate
   * @description This API is used to validate an exam
   * @param {String} id - ID for the exam
   * @returns {Boolean}
   */
  static validate(id) {
    return axios
      .post(ExamApiGenerated.contextUrl + `/${id}/validate`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default ExamApiGenerated;
