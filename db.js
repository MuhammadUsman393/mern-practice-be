const mongoose = require("mongoose");
const connection =
  "mongodb+srv://farazirfan22:FaRaZ22062002@cluster0.hvlhsqa.mongodb.net/usman-practice?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose
    .connect(connection)
    .then(() => {
      console.log("Connected to Mongo Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to Mongo:", error);
    });
};

module.exports = connectToMongo;
