const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: [true, "Email Already Exists"],
  },
  password: String,
});

const userModel = mongoose.model("users", userShema);

module.exports = userModel;
