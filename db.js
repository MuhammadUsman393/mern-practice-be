const mongoose = require("mongoose");
const connection = "mongodb+srv://usman:usm123@newcluster.ehcnmwy.mongodb.net/";

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
