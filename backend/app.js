// Import the package
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Item = require("./models/Item"); // Mongoose Schema
const User = require("./models/User"); // Mongoose Schema
const products = require("./productsCollection.json");
const users = require("./usersCollection.json");
require("dotenv/config");
const swaggerConfig = require("./swagger/config.js");
const mongoDB = require("./tests/configs/mongoDB.js");

/* swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express"); */

// Execute the package
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://127.0.0.1:3000"],
  })
);

// Connect to DB, see .env file;
/* mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {}
); */

// In-memory MongoDB
mongoDB.connectDB;

// DB Connection status - 0: disconnected; 1: connected; 2: connecting; 3: disconnecting;
//console.log("DB connection status: " + mongoose.connection.readyState);

// Repopulate DB on the application's start up.
// We use async to wait till db is ready.
const populateDB = () => {
  User.deleteMany({}, () => {});
  User.insertMany(users);

  Item.deleteMany({}, () => {});
  Item.insertMany(products);

  console.log("================DB has been populated===============");
};
populateDB();

// Import routes;
const itemRoute = require("./routes/itemRoutes");
const userRoute = require("./routes/userRoutes");

// Every time you go to /item the itemRoute will be used;
app.use("/item", itemRoute);
app.use("/user", userRoute);

// Swagger. See swagger/config.js
app.use(
  swaggerConfig.docsURL,
  swaggerConfig.swaggerServe,
  swaggerConfig.swaggerSetup
);

app.listen(3001);
//app.listen();

module.exports.server = app;
