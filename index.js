"use strict";
require("dotenv").config();
// const { buildSchema } = require("graphql");
const { makeExecutableSchema } = require("graphql-tools");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const morgan = require("morgan");
// const fs = require("fs");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./lib/resolvers");

const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV !== "production";
//definiendo el esquema inicial, usamos lectura de archivos de forma sincrona debido a que esto solo se va a ejecutar durante la carga del archivo
const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

//Configurar objetos resolvers

//los tipos escalares en graphql son string, integer, float o boolean

//ejecutar el query hello
// graphql(schema, "{ hello }", resolvers).then((data) => {
//   console.log(data);
// });

app.use(morgan("dev"));
app.use(cors());
//El middleware lleva por parámetro un objeto de configuración que va  a indicar el schema a ejecutar, pide los resolvers y por último graphiql que nos va a indicar el entorno de desarrollo de graphql que vamos a utilizar
app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
