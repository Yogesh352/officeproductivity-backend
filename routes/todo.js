import express from "express";

import {
  getTodo,
  updateTodo,
  createTodo,
  deleteTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/", getTodo);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;