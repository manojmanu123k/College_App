import axios from "axios";
import { properties } from "../../config/properties";

class StudentApiGenerated {
  static contextUrl = properties.endpoint + "/student";

  // CRUD METHODS

  /**
   * createStudent
   * @description CRUD ACTION create
   */
  static createStudent(student) {
    return axios
      .post(StudentApiGenerated.contextUrl, student)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * deleteStudent
   * @description CRUD ACTION delete
   * @param {ObjectId} id - Id
   */
  static deleteStudent(id) {
    return axios
      .delete(StudentApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * findBy_courses
   * @description CRUD ACTION findBy_courses
   * @param {ObjectId} id - Id of model to search for
   */
  static findBy_courses(id) {
    return axios
      .get(StudentApiGenerated.contextUrl + "/findBy_courses/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getOneStudent
   * @description CRUD ACTION get
   * @param {ObjectId} id - Id resource
   */
  static getOneStudent(id) {
    return axios
      .get(StudentApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getStudentList
   * @description CRUD ACTION list
   */
  static getStudentList() {
    return axios
      .get(StudentApiGenerated.contextUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * saveStudent
   * @description CRUD ACTION update
   * @param {ObjectId} id - Id
   */
  static saveStudent(student) {
    return axios
      .post(StudentApiGenerated.contextUrl + "/" + student._id, student)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Custom APIs
}

export default StudentApiGenerated;
