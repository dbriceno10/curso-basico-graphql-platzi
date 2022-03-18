"use strict";

const { graphql, buildSchema } = require("graphql");

//definiendo el esquema inicial

const schema = buildSchema(`
type Query {
  hello: String
  saludo: String
}
`);

//Configurar objetos resolvers

const resolvers = {
  //van a tener propiedades que deben tener propiedades igual al nombre de la query a ejecutar, cada vez que agrega una nueva query se debe definir un nuevo resolver
  hello: () => {
    return "Hello World";
  },
  saludo: () => "Hola Mundo",
};

//los tipos escalares en graphql son string, integer, float o boolean

//ejecutar el query hello
graphql(schema, "{ hello }", resolvers).then((data) => {
  console.log(data);
});
