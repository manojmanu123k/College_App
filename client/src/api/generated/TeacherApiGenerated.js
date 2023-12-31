import axios from "axios";
import { properties } from "../../config/properties";

class TeacherApiGenerated {
  static contextUrl = properties.endpoint + "/teacher";

  // CRUD METHODS

  /**
   * createTeacher
   * @description CRUD ACTION create
   */
  static createTeacher(teacher) {
    return axios
      .post(TeacherApiGenerated.contextUrl, teacher)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * deleteTeacher
   * @description CRUD ACTION delete
   * @param {ObjectId} id - Id
   */
  static deleteTeacher(id) {
    return axios
      .delete(TeacherApiGenerated.contextUrl + "/" + id)
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
      .get(TeacherApiGenerated.contextUrl + "/findBy_courses/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getOneTeacher
   * @description CRUD ACTION get
   * @param {ObjectId} id - Id resource
   */
  static getOneTeacher(id) {
    return axios
      .get(TeacherApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getTeacherList
   * @description CRUD ACTION list
   */
  static getTeacherList() {
    return axios
      .get(TeacherApiGenerated.contextUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * saveTeacher
   * @description CRUD ACTION update
   * @param {ObjectId} id - Id
   */
  static saveTeacher(teacher) {
    return axios
      .post(TeacherApiGenerated.contextUrl + "/" + teacher._id, teacher)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Custom APIs
}

export default TeacherApiGenerated;
