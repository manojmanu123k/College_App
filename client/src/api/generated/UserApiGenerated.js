import axios from "axios";
import { properties } from "../../config/properties";

class UserApiGenerated {
  static contextUrl = properties.endpoint + "/user";

  // CRUD METHODS

  /**
   * createUser
   * @description CRUD ACTION create
   */
  static createUser(user) {
    return axios
      .post(UserApiGenerated.contextUrl, user)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * deleteUser
   * @description CRUD ACTION delete
   * @param {ObjectId} id - Id
   */
  static deleteUser(id) {
    return axios
      .delete(UserApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getOneUser
   * @description CRUD ACTION get
   * @param {ObjectId} id - Id resource
   */
  static getOneUser(id) {
    return axios
      .get(UserApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getUserList
   * @description CRUD ACTION list
   */
  static getUserList() {
    return axios
      .get(UserApiGenerated.contextUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * saveUser
   * @description CRUD ACTION update
   * @param {ObjectId} id - Id
   */
  static saveUser(user) {
    return axios
      .post(UserApiGenerated.contextUrl + "/" + user._id, user)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Custom APIs
  /**
   * changePassword
   * @description Change password of user from admin
   * @returns object
   */
  static changePassword(id) {
    return axios
      .post(UserApiGenerated.contextUrl + `/${id}/changePassword`)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default UserApiGenerated;
