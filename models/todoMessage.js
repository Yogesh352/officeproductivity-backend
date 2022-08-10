import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  assignee: String,
  name: String,
  creator: String,
  deadline: { type: Date, default: new Date() },
  priority: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TodoMessage = mongoose.model("TodoMessage", todoSchema);
export default TodoMessage;
