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


/*
Los parámetros de graphql se pasan como un objeto
Los resolvers se colocan del siguiente modo

graphql({
    schema: schema,
    source: '{ saludo}',
    rootValue: resolvers
})
.then((data) => {
    console.log(data);
})
.catch(e => {
    console.log(e);
});


Es posible llamar a más de un resolver:

graphql(schema, '{ hello, saludo }', resolvers).then((data) => {
    console.log(data)
})
 */