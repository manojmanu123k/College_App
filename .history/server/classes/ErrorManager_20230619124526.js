import SafeError from "./SafeError";
import Logger from "./Logger";

// Start Import Models
import UserModel from "../models/Test_db/UserModel";
import CourseModel from "../models/Test_db/CourseModel";
import ExamModel from "../models/Test_db/ExamModel";
import StudentModel from "../models/Test_db/StudentModel";
import TeacherModel from "../models/Test_db/TeacherModel";
// End Import Models

export class ErrorManager {
  constructor() {}

  getSafeError(err) {
    Logger.error(err.stack);
    if (err instanceof SafeError) {
      return err;
    }

    // create a safe, generic error message to always return
    return new SafeError({});
  }

  // Initialize models
  initModels() {
    UserModel.init();
    CourseModel.init();
    ExamModel.init();
    StudentModel.init();
    TeacherModel.init();
  }
}

export default new ErrorManager();
