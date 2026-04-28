const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connect to Database");
  });
};

module.exports = connectToDatabase;
