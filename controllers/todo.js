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
  const { title, description, assignee, priority, deadline } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No todo with that id");

  const updatedTodo = {
    title,
    description,
    priority,
    assignee,
    deadline,
    _id: _id,
  };
  await TodoMessage.findByIdAndUpdate(_id, updatedTodo, { new: true });

  res.json(updatedTodo);
};

export const deleteTodo = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No todo with that id");

  await TodoMessage.findByIdAndRemove(_id);
  res.json({ message: "Todo deleted successfully" });
};

export const completeTodo = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No todo with that id");

  const todo = await TodoMessage.findById(_id);
  todo.completed = true;

  const updatedTodo = await TodoMessage.findByIdAndUpdate(_id, todo, {
    new: true,
  });

  res.status(200).json(updatedTodo);
};
