"use strict";

const mutations = require("./mutations");
const queries = require("./queries");
const types = require("./types");

module.exports = {
  Query: queries,
  Mutation: mutations,
  // Course: types.Course,
  ...types, //con el spread operator me traigo todo lo que este en types, si quiero agregar más resolveres en lugar que tener que hacer la destructuración de todos, ya los voy a tener a todos disponibles
};
