import mongoose from "mongoose";
import Logger from "./Logger";
import properties from "../properties.js";

import UserModel from "../models/Test_db/UserModel";
import CourseModel from "../models/Test_db/CourseModel";
import ExamModel from "../models/Test_db/ExamModel";
import StudentModel from "../models/Test_db/StudentModel";
import TeacherModel from "../models/Test_db/TeacherModel";

class Database {
  constructor() {}

  async init() {
    await this.authenticate();
    Logger.info("MongoDB connected at: " + properties.test_db_dbUrl);

    UserModel.init();
    CourseModel.init();
    ExamModel.init();
    StudentModel.init();
    TeacherModel.init();
  }

  async authenticate() {
    Logger.info("Authenticating to the databases...");
    try {
      this.dbConnection_test_db = await mongoose.connect(
        "mongodb://127.0.0.1:27017" + properties.test_db_dbUrl,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
          autoReconnect: true,
          reconnectTries: Number.MAX_VALUE,
          reconnectInterval: 1000,
        }
      );
    } catch (err) {
      Logger.error(`Failed connection to the DB: ${err.message}`);
      Logger.error(err);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  getConnection() {
    return this.dbConnection_test_db;
  }
}

export default new Database();
