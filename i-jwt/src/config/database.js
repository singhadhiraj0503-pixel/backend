const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to the Database");
  });
};

module.exports = connectToDatabase;
