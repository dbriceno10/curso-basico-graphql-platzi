// const resolvers = {
//   //van a tener propiedades que deben tener propiedades igual al nombre de la query a ejecutar, cada vez que agrega una nueva query se debe definir un nuevo resolver
//   hello: () => {
//     return "Hello World";
//   },
//   saludo: () => "Hola Mundo",
// };

// module.exports = {
//   resolvers,
// };

"use strict";

const connectDb = require("./db");
const { ObjectId } = require("mongodb");

module.exports = {
  Query: {
    getCourses: async () => {
      let db;
      let courses = [];
      try {
        db = await connectDb();
        courses = await db.collection("courses").find().toArray();
      } catch (error) {
        console.error(error);
      }
      return courses;
    },
    getCourse: async (root, { id }) => {
      let db;
      let course;
      try {
        db = await connectDb();
        course = await db.collection("courses").findOne({ _id: ObjectId(id) });
      } catch (error) {
        console.error(error);
      }
      return course;
    },
  },
};
