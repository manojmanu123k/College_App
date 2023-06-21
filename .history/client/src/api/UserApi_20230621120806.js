import axios from 'axios';
import config from '../config/config';
import CourseModel from '../models/Test_db/CourseModel';
import StudentModel from '../models/Test_db/StudentModel';
import TeacherModel from '../models/Test_db/TeacherModel';
import UserModel from '../models/Test_db/UserModel';

class UserApi {
  // Get User List
  static getUserList() {
    return fetch(`${config.apiUrl}/users`)
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  }

  // Login
  static login(username, password) {
    return axios
      .post(`${config.apiUrl}/login`, {
        username: username,
        password: password,
      })
      .then((response) => response.data)
      .catch((error) => error);
  }

  // Verify Token
  static verifyToken(token) {
    return axios
      .post(`${config.apiUrl}/verifyToken`, { token: token })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  // Change Password
  static changePassword(passwordNew, passwordOld) {
    return axios
      .post(`${config.apiUrl}/changePassword`, {
        passwordNew: passwordNew,
        passwordOld: passwordOld,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  // Change Password (Admin)
  static changePasswordAdmin(id, passwordAdmin, passwordNew) {
    return axios
      .post(`${UserModel.contextUrl}/${id}/changePassword`, {
        passwordNew: passwordNew,
        passwordAdmin: passwordAdmin,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}

export default UserApi;
