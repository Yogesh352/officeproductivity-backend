import express from "express";

import {
  getTodo,
  updateTodo,
  createTodo,
  deleteTodo,
  completeTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/", getTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/completeTodo", completeTodo);

export default router;
