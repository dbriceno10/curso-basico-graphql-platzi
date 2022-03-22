#Definición de un schema desde js

```js

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

```

# Queries ejecutadas en el curso en GraphiQL

## Alias y Fragments

```graphql
{
  AllCourses: getCourses {
    ...CourseFields
  }

  Course1: getCourse(id: "5cb4b8ce75f954a0585f7be2") {
    ...CourseFields
    teacher
  }

  Course2: getCourse(id: "5cb4b8ce75f954a0585f7be4") {
    ...CourseFields
    topic
  }
}

fragment CourseFields on Course {
  _id
  title
  description
  people {
    _id
    name
  }
}
```
