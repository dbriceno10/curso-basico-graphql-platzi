require("dotenv").config();
let connection;
const { MongoClient } = require("mongodb");
const { DB_HOST, DB_NAME, DB_PORT } = process.env;
const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
async function connectDB() {
  if (connection) return connection;
  let connection, client;
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = client.db(DB_NAME);
  } catch (error) {
    console.error("No se pudo conectar ", error);
    process.exit(1); //Saco el proceso
  }

  return connection;
}

module.exports = connectDB;
