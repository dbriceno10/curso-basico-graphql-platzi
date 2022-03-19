"use strict";
require("dotenv").config();
const { graphql, buildSchema } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const morgan = require("morgan");

const app = express();

const port = process.env.PORT || 8080;
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
// graphql(schema, "{ hello }", resolvers).then((data) => {
//   console.log(data);
// });

app.use(morgan("dev"));

//El middleware lleva por parámetro un objeto de configuración que va  a indicar el schema a ejecutar, pide los resolvers y por último graphiql que nos va a indicar el entorno de desarrollo de graphql que vamos a utilizar
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
