var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const { createConnection, getConnectionManager } = require("typeorm");
var indexRouter = require("./routes/index");

var app = express();
let conn = null;
let errormessage = ""

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Cấu hình kết nối với cơ sở dữ liệu mysql

(async () => {
  const config = {
    name: process.env.DB_NAME,
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  };

  try {
    conn = await createConnection(config);
    console.log(
      `Database connection success.`
    );
  } catch (err) {
    if (err.name === "AlreadyHasActiveConnectionError") {
      const activeConnection = getConnectionManager().get(config.name);
      return activeConnection;
    }
    errormessage = err;
    conn= null
  }
})();


app.use("/", (req, res, next) => {
  req.connect = conn;
  req.error = errormessage;
  next();
}, indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
