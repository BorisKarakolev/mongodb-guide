const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/bambi");
}

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  res.send({ error: err.message });
});

module.exports = app;
