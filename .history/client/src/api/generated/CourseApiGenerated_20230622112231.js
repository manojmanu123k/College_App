import axios from "axios";
import properties from "../../config/properties";

class CourseApiGenerated {
  static contextUrl = properties.endpoint + "/course";

  // CRUD METHODS

  /**
   * createCourse
   * @description CRUD ACTION create
   */
  static createCourse(course) {
    try {
      const response = await axios.post(CourseApiGenerated.contextUrl, course);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * deleteCourse
   * @description CRUD ACTION delete
   * @param {ObjectId} id - Id
   */
  static deleteCourse(id) {
    try {
      const response = await axios.delete(CourseApiGenerated.contextUrl + "/" + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * getOneCourse
   * @description CRUD ACTION get
   * @param {ObjectId} id - Id resource
   */
  static getOneCourse(id) {
    try {
      const response = await axios.get(CourseApiGenerated.contextUrl + "/" + id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * getCourseList
   * @description CRUD ACTION list
   */
  static getCourseList() {
    try {
      const response = await axios.get(CourseApiGenerated.contextUrl);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * saveCourse
   * @description CRUD ACTION update
   * @param {ObjectId} id - Id
   */
  static saveCourse(course) {
    try {
      const response = await axios.post(
        CourseApiGenerated.contextUrl + "/" + course._id,
        course
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Custom APIs
}

export default CourseApiGenerated;
