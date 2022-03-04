const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const formsRouter = require("./routes/form-routes");
const usersRouter = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

// Routes
app.use(bodyParser.json());

app.use("/api/forms", formsRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const port = process.config.PORT || 5000;

mongoose
  .connect(process.env.DB_URI)
  .then(app.listen(port, console.log(`server is running at port: ${port}`)))
  .catch((err) => {
    console.log(err);
  });
