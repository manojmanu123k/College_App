import { Schema, model } from "mongoose";
import CourseModel from "./CourseModel";
import StudentModel from "./StudentModel";
import TeacherModel from "./TeacherModel";

const mongoose = require("mongoose");

const generatedModel = {
  /**
   * Init schema
   */
  init() {
    const examSchema = new Schema({
      // ...
      courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
      },
      // ...
    });

    examSchema
      .virtual("course", {
        ref: "Course",
        localField: "courseId",
        foreignField: "_id",
        justOne: true
      })
      .get(function () {
        return this.get("course");
      })
      .set(function (course) {
        this.set("course", course);
        this.set("courseId", course._id);
      });

    examSchema.virtual("students", {
      ref: "Student",
      localField: "_id",
      foreignField: "examId"
    });

    examSchema.virtual("teachers", {
      ref: "Teacher",
      localField: "_id",
      foreignField: "examId"
    });

    // ...

    const ExamModel = model("Exam", examSchema);

    generatedModel.setModel(ExamModel);

    return examSchema;
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
   * examModel.create
   * @description CRUD ACTION create
   *
   */
  async create(item) {
    const obj = new generatedModel.model(item);
    return await obj.save();
  },

  /**
   * examModel.delete
   * @description CRUD ACTION delete
   * @param ObjectId id Id
   *
   */
  async delete(id) {
    return await generatedModel.model.findByIdAndRemove(id);
  },

  /**
   * examModel.get
   * @description CRUD ACTION get
   * @param ObjectId id Id resource
   *
   */
  async get(id) {
    return await generatedModel.model.findOne({ _id: id });
  },

  /**
   * examModel.list
   * @description CRUD ACTION list
   *
   */
  async list() {
    return await generatedModel.model.find();
  },

  /**
   * examModel.update
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
