const express = require("express");
const userModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const alreadyExists = await userModel.findOne({ email });

  if (alreadyExists) {
    return res.status(400).json({
      message: "Email already Exists !!",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt-token", token);

  res.status(201).json({
    message: "User Registered Successfully",
    user,
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExits = await userModel.findOne({ email });

  if (!userExits) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const passwordMatched =
    userExits.password ===
    crypto.createHash("md5").update(password).digest("hex");

  if (!passwordMatched) {
    return res.status(401).json({
      message: "Incorrect Password",
    });
  }

  const token = jwt.sign(
    {
      id: userExits._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt-token", token);

  res.status(201).json({
    message: "User Logged In!!",
    userExits,
  });
});

authRouter.get("/get-user", async (req, res) => {
  //   console.log("cookies:", req.cookies);
  const token = req.cookies["jwt-token"];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  const user = await userModel.findById(decoded.id);

  res.status(200).json({
    name: user.name,
    email: user.email,
  });
});

// authRouter.get("/get-user", async (req, res) => {
//   console.log("cookies:", req.cookies);

//   const token = req.cookies["jwt-token"]; // ✅ FIXED

//   if (!token) {
//     return res.status(401).json({
//       message: "No token provided",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("decoded:", decoded);

//     res.json(decoded);
//   } catch (err) {
//     res.status(401).json({
//       message: "Invalid token",
//     });
//   }
// });

module.exports = authRouter;
