/** @format */

const mongoose = require("mongoose");

try {
  const conn = mongoose.connect(
    "mongodb+srv://Kaka5611:Kaka5611@cluster0.ygmvx.mongodb.net/MunnaPlay?retryWrites=true&w=majority",
    {
      // const conn = mongoose.connect("mongodb://localhost:27017/munnaplay", {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
  if (conn) {
    console.log("connection successfully");
  }
} catch (error) {
  console.log(error);
}
