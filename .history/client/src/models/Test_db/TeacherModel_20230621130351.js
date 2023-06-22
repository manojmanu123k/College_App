import { Schema } from "mongoose";
import Database from "../../../classes/Database_Test_db";

const mongoose = require("mongoose");

const generatedModel = {
  /**
   * Init schema
   */
  init() {
    const db = Database.getConnection();

    /**
     * teacher
     */
    const teacherSchema = new mongoose.Schema({
      name: {
        type: "String",
        required: true,
      },
      // RELATIONS
      _students: [{
        type: Schema.Types.ObjectId,
        ref: "Student",
      }],
      _courses: [{
        type: Schema.Types.ObjectId,
        ref: "Course",
      }],
      _exams: [{
        type: Schema.Types.ObjectId,
        ref: "Exam",
      }],
       
      _teachers: [{
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      }],
      
    });

    generatedModel.setModel(db.connection.model("Teacher", teacherSchema));

    return teacherSchema;
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
   * teacherModel.create
   * @description CRUD ACTION create
   *
   */
  async create(item) {
    const obj = new generatedModel.model(item);
    return await obj.save();
  },

  /**
   * teacherModel.delete
   * @description CRUD ACTION delete
   * @param ObjectId id Id
   *
   */
  async delete(id) {
    return await generatedModel.model.findByIdAndRemove(id);
  },

  /**
   * teacherModel.get
   * @description CRUD ACTION get
   * @param ObjectId id Id resource
   *
   */
  async get(id) {
    return await generatedModel.model.findOne({ _id: id });
  },

  /**
   * teacherModel.list
   * @description CRUD ACTION list
   *
   */
  async list() {
    return await generatedModel.model.find();
  },

  /**
   * teacherModel.update
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
