import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import todoRoute from "./routes/todolist.js";
import userRoute from "./routes/user.js";

//middle ware
// const isVerify = (req, res, next) => {
//   console.log("this is test verify");
//   next();
// };

const app = express();
app.use(cors()); // request from different domain
app.use(bodyParser.json()); // parse the incoming request
app.use("/uploads", express.static("images"));

app.use("/todo", todoRoute);

app.use("/", userRoute);

const PORT = 8000;

app.get("/list", (req, res) => {
  res.json({
    message: "this is test",
  });
});

Connection();

app.listen(PORT, () => console.log("Successfully connected", PORT));
