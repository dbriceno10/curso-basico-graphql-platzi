"use strict";
/**Consultas de tipos compuestos */

const connectDb = require("./db");
const { ObjectId } = require("mongodb");

module.exports = {
  Course: {
    people: async ({ people }) => {
      let db;
      let studentData;
      let ids;
      try {
        db = await connectDb();
        ids = people ? people.map((id) => ObjectId(id)) : [];
        studentData =
          ids.length > 0
            ? await db
                .collection("students")
                .find({ _id: { $in: ids } })
                .toArray()
            : []; //Va a buscar a todos los estudiantes que recibamos en el campo de people
      } catch (error) {
        console.error(error);
      }
      return studentData;
    },
  },
};