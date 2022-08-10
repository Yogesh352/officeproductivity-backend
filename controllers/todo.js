import mongoose from "mongoose";

import TodoMessage from "../models/todoMessage.js";

export const getTodo = async (req, res) => {
  try {
    const todoMessages = await TodoMessage.find();

    res.status(200).json(todoMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  const todo = req.body;

  const newTodoMessage = new TodoMessage({
    ...todo,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTodoMessage.save();

    res.status(201).json(newTodoMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  const { id: _id } = req.params;
  const { title, description, creator, assignee, deadline } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No todo with that id");

  const updatedTodo = { title, description, creator, assignee, deadline, _id: _id };
  await TodoMessage.findByIdAndUpdate(_id, updateTodo, { new: true });

  res.json(updatedTodo);
};

export const deleteTodo = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No todo with that id");

  await TodoMessage.findByIdAndRemove(_id);
  res.json({ message: "Todo deleted successfully" });
};
