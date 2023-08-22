const express = require("express");

const app = express();
const examRouter = require("./routes/examRouter.js");
app.use(express.json());
app.use("/exam", examRouter);

app.get("*", (req, res, next) => {
  const err = new Error("sorry,this is invalid url");
  err.status = "fail";
  err.statusCode = "404";
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    errors: err.errors || [],
  });
});

module.exports = app;
app.listen(5000, console.log("servering"));
