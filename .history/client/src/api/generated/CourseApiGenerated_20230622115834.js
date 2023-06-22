import axios from "axios";
//import properties from "../../config/properties";

class CourseApiGenerated {
  static contextUrl = properties.endpoint + "/course";

  // CRUD METHODS

  /**
   * createCourse
   * @description CRUD ACTION create
   */
  static createCourse(course) {
    return axios
      .post(CourseApiGenerated.contextUrl, course)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * deleteCourse
   * @description CRUD ACTION delete
   * @param {ObjectId} id - Id
   */
  static deleteCourse(id) {
    return axios
      .delete(CourseApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getOneCourse
   * @description CRUD ACTION get
   * @param {ObjectId} id - Id resource
   */
  static getOneCourse(id) {
    return axios
      .get(CourseApiGenerated.contextUrl + "/" + id)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * getCourseList
   * @description CRUD ACTION list
   */
  static getCourseList() {
    return axios
      .get(CourseApiGenerated.contextUrl)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * saveCourse
   * @description CRUD ACTION update
   * @param {ObjectId} id - Id
   */
  static saveCourse(course) {
    return axios
      .post(CourseApiGenerated.contextUrl + "/" + course._id, course)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        throw error;
      });
  }

  // Custom APIs
}

export default CourseApiGenerated;
