const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { validationError } = require("sequelize");
const createError = require('http-errors');
const helmet = require('helmet');
const path = require('path');
const { environment } = require("./config");
const routes = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());


// Security Middleware
app.use(cors({ origin: true }));
app.use(helmet({ hsts: false }));

app.use(routes);

// Serve React Application
// This should come after routes, but before 404 and error handling.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get(/\/(?!api)*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(function (err, _req, res, _next) {
  res.status(err.status || 500);
  const isProduction = environment === 'production';
  if (err.status === 401) {
    res.set('WWW-Authenticate', 'Bearer');
  }
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    error: err.errors,
    stack: isProduction ? null : err.stack,
    // error: JSON.parse(JSON.stringify(err)),
  });
});

module.exports = app;
