import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },

  { timeStamp: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
