// Database
import Database from "../../classes/Database_Test_db";
import { Schema } from "mongoose";
import CourseModel from "./CourseModel";
import ExamModel from "./ExamModel";

// Logger
import Logger from "../../classes/Logger";
const mongoose = require("mongoose");

const generatedModel = {
  /**
   * Init schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * User
     */
    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      // Other user properties

      // RELATIONS
      _courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
      }],
      _exams: [{
        type: Schema.Types.ObjectId,
        ref: "Exam",
      }],
    });

    generatedModel.setModel(db.connection.model("User", userSchema));

    return userSchema;
  },

  /**
   * Set Model
   */
  setModel: (model) => {
    generatedModel.model = model;
  },

  /**
   * Get model
   */
  getModel: () => {
    return generatedModel.model;
  },

  // Start queries

  // CRUD METHODS

  /**
   * userModel.create
   * @description CRUD ACTION create
   *
   */
  async create(item) {
    const obj = new generatedModel.model(item);
    return await obj.save();
  },

  /**
   * userModel.delete
   * @description CRUD ACTION delete
   * @param ObjectId id Id
   *
   */
  async delete(id) {
    return await generatedModel.model.findByIdAndRemove(id);
  },

  /**
   * userModel.get
   * @description CRUD ACTION get
   * @param ObjectId id Id resource
   *
   */
  async get(id) {
    return await generatedModel.model.findOne({ _id: id });
  },

  /**
   * userModel.list
   * @description CRUD ACTION list
   *
   */
  async list() {
    return await generatedModel.model.find();
  },

  /**
   * userModel.update
   * @description CRUD ACTION update
   * @param ObjectId id Id
   *
   */
  async update(item) {
    return await generatedModel.model.findOneAndUpdate(
      { _id: item._id },
      item,
      { new: true }
    );
  },
};

export default generatedModel;
