"use strict";
require("dotenv").config();
const { buildSchema } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const morgan = require("morgan");
// const fs = require("fs");
const { readFileSync } = require("fs");
const { join } = require("path");
// const { resolvers } = require("./lib/resolvers");
const resolvers = require("./lib/resolvers");

const app = express();

const port = process.env.PORT || 8080;
//definiendo el esquema inicial, usamos lectura de archivos de forma sincrona debido a que esto solo se va a ejecutar durante la carga del archivo

const schema = buildSchema(
  readFileSync(join(__dirname, "lib", "schema.graphql"), "utf-8")
);

//Configurar objetos resolvers

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
