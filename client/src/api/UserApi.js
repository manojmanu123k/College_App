import UserApiGenerated from "./generated/UserApiGenerated";
import axios from "axios";
import { properties } from "../config/properties";

class UserApi extends UserApiGenerated {
  // Get User List
  static getUserList() {
    return fetch("http://localhost:3000/api/users")
      .then(response => {
        return response.json();
      })
      .catch(error => {
        throw error;
      });
  }

  // Login
  static login(username, password) {
    return axios
      .post(properties.endpoint + "/login", {
        username: username,
        password: password
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  }

  // Verify Token
  static verifyToken(token) {
    return axios
      .post(properties.endpoint + "/verifyToken", { token: token })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Change Password
  static changePassword(passwordNew, passwordOld) {
    return axios
      .post(properties.endpoint + "/changePassword", {
        passwordNew: passwordNew,
        passwordOld: passwordOld
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Change Password (Admin)
  static changePasswordAdmin(id, passwordAdmin, passwordNew) {
    return axios
      .post(UserApiGenerated.contextUrl + "/" + id + "/changePassword", {
        passwordNew: passwordNew,
        passwordAdmin: passwordAdmin
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default UserApi;
