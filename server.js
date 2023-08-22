const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
const examRouter = require("./routes/examRouter.js");
app.use(express.json());
app.use("/exam", examRouter);
app.use(cors(corsOptions));
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
