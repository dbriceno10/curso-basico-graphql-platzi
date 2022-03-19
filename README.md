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
