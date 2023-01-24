import express from "express";
import {
  getTodoController,
  postTodoController,
  getTodoById,
  getTodoByIdAndUpdate,
  getTodoByIdAndDelete,
  deleteAllTodos,
  updateAllTodos,
} from "../controller/todoController.js";
import verifyToken from "../middleware/auth.js";

const route = express.Router();

// route.get("/", verifyToken, getTodoController);
route.get("/", getTodoController);

route.post("/", postTodoController);
route.get("/:id", getTodoById);
route.put("/:id", getTodoByIdAndUpdate);
route.delete("/:id", getTodoByIdAndDelete);
route.delete("/", deleteAllTodos);
route.post("/updateAll", updateAllTodos);

export default route;
