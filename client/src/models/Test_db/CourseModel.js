// Database
// import Database from "../classes/Database_Test_db";
import { Schema } from "mongoose";

import ExamModel from "./ExamModel";


// Logger
// import Logger from "../classes/Logger";
const mongoose = require("mongoose");


const generatedModel = {
  /**
   * Init schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * course
     */
    // CourseModel.js

const courseSchema = new mongoose.Schema({
  // ...

  // RELATIONS
  _exams: [{
    type: Schema.ObjectId,
    ref: "Exam",
  }],
  _students: [{
    type: Schema.ObjectId,
    ref: "Student",
  }],
  _teachers: [{
    type: Schema.ObjectId,
    ref: "Teacher",
  }],

  // ...
});

    

    generatedModel.setModel(db.connection.model("Course", courseSchema));

    return courseSchema;
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
   * coursesModel.create
   * @description CRUD ACTION create
   *
   */
  async create(item) {
    const obj = new generatedModel.model(item);
    return await obj.save();
  },

  /**
   * coursesModel.delete
   * @description CRUD ACTION delete
   * @param ObjectId id Id
   *
   */
  async delete(id) {
    return await generatedModel.model.findByIdAndRemove(id);
  },

  /**
   * coursesModel.get
   * @description CRUD ACTION get
   * @param ObjectId id Id resource
   *
   */
  async get(id) {
    return await generatedModel.model.findOne({ _id: id });
  },

  /**
   * coursesModel.list
   * @description CRUD ACTION list
   *
   */
  async list() {
    return await generatedModel.model.find();
  },

  /**
   * coursesModel.update
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
