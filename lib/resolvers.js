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

const courses = [
  {
    _id: "anyid1",
    title: "Mi título1",
    teacher: "Mi profesor",
    description: "una descripción",
    topics: "programación",
  },
  {
    _id: "anyid2",
    title: "Mi título2",
    teacher: "Mi profesor",
    description: "una descripción",
    topics: "programación",
  },
  {
    _id: "anyid3",
    title: "Mi título3",
    teacher: "Mi profesor",
    description: "una descripción",
    topics: "programación",
  },
];

module.exports = {
  Query: {
    getCourses: () => {
      return courses;
    },
    getCourse: (root, args) => {
      const course = courses.filter((course) => course._id === args.id);
      return course.pop();
    },
  },
};
