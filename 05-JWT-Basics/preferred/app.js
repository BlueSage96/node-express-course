process.noDeprecation = true; //suppress deprecation warnings in console
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const mainRouter = require("./routes/users");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/", mainRouter);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () => console.log(`Server's listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
