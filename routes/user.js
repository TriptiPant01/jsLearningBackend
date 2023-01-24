import express from "express";
import bycrpt from "bcrypt";
import multer from "multer";

import jwt from "jsonwebtoken";
import User from "../model/User.js";
import Todo from "../model/Todo.js";
import { upload } from "../upload.js";
// const upload = multer({ dest: "images/" });

const route = express.Router();

route.post("/login", async (request, response) => {
  try {
    const { fullName, email, password } = request.body;

    const userDetail = await User.findOne({ email: email });
    if (!userDetail)
      return response.status(400).json({ message: "User doesnot exist" });
    const isMatch = await bycrpt.compare(password, userDetail.password);

    if (!isMatch) {
      return response.status(400).json({ message: "Invalid Credentails" });
    }

    // const todo = Todo.find();
    const token = jwt.sign({ userDetail }, process.env.SECRET_KEY);
    delete userDetail.password;

    response.status(200).json({
      token,
      fullName: userDetail.fullname,
      email: userDetail.email,
      // todoList: todo,
    });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

route.post("/register", async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password)
    return res.status(400).json({ message: "Please enter all the fields" });
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User already exist" });
  } else {
    try {
      const salt = await bycrpt.genSalt();
      const passwordHash = await bycrpt.hash(password, salt);

      const newUser = await User.create({
        fullname,
        email,
        password: passwordHash,
      });

      await newUser.save();
      res.status(201).json({ message: "Successfully created" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

route.post("/profile", upload, function (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload your file" });
  } else {
    console.log(req.file);
  }

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});
export default route;
