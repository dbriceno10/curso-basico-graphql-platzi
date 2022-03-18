"use strict";

const { graphql, buildSchema } = require("graphql");

//definiendo el esquema inicial

const schema = buildSchema(`
type Query {
  hello: String
}
`);

//los tipos escalares en graphql son string, integer, float o boolean

//ejecutar el query hello
graphql(schema, "{ hello }").then((data) => {
  console.log(data);
});
