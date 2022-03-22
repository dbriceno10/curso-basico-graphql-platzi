"use strict";

const connectDb = require("./db");
const { ObjectId } = require("mongodb");
const errorHandler = require("./errorHandler");

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: "",
      topics: "",
    };
    const newCourse = Object.assign(defaults, input);
    let db;
    let course;
    try {
      db = await connectDb();
      course = await db.collection("courses").insertOne(newCourse);
      newCourse._id = course.insertedId; //---> esto me devuelve el último id insertado
    } catch (error) {
      errorHandler(error);
    }
    return newCourse;
  },
  createPerson: async (root, { input }) => {
    let db;
    let student;
    try {
      db = await connectDb();
      course = await db.collection("students").insertOne(input);
      input._id = student.insertedId; //---> esto me devuelve el último id insertado
    } catch (error) {
      errorHandler(error);
    }
    return input;
  },
  editCourse: async (root, { _id, input }) => {
    let db;
    let course;

    try {
      db = await connectDb();
      await db
        .collection("courses")
        .updateOne({ _id: ObjectId(_id) }, { $set: input });
      course = await db.collection("courses").findOne({ _id: ObjectId(_id) });
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },
  editPerson: async (root, { _id, input }) => {
    let db;
    let student;

    try {
      db = await connectDb();
      await db
        .collection("students")
        .updateOne({ _id: ObjectId(_id) }, { $set: input });
      student = await db.collection("students").findOne({ _id: ObjectId(_id) });
    } catch (error) {
      errorHandler(error);
    }
    return student;
  },
  deleteCourse: async (root, { _id }) => {
    let db;
    let course;
    try {
      db = await connectDb();
      course = await db.collection("courses").findOne({ _id: ObjectId(_id) });
      await db.collection("courses").deleteOne({ _id: ObjectId(_id) });
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },
  deletePerson: async (root, { _id }) => {
    let db;
    let student;

    try {
      db = await connectDb();
      student = await db.collection("students").findOne({ _id: ObjectId(_id) });
      await db.collection("students").deleteOne({ _id: ObjectId(_id) });
    } catch (error) {
      errorHandler(error);
    }
    return student;
  },
  addStudentToCourse: async (root, { courseId, studentId }) => {
    let db;
    let student;
    let course;
    try {
      db = await connectDb();
      course = await db
        .collection("courses")
        .findOne({ _id: ObjectId(courseId) });
      student = await db
        .collection("students")
        .findOne({ _id: ObjectId(studentId) });
      if (!course || !student) {
        throw new Error("Course or student not found");
      }

      await db.collection("courses").updateOne(
        {
          _id: ObjectId(courseId),
        },
        //people es un array tiene los ids de los estudiantes de un curso...
        { $addToSet: { people: ObjectId(studentId) } }
      );
    } catch (error) {
      errorHandler(error);
    }
    return course;
  },
};
