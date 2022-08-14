import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import todoRoutes from "./routes/todo.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";
import conversationRoutes from "./routes/conversation.js";
import messagesRoutes from "./routes/messages.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/conversation", conversationRoutes);
app.use("/messages", messagesRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Productivity API");
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "https://localhost:3000", methods: ["GET", "POST"] },
});

//const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(process.env.PORT || 5000, function () {
      console.log(
        "Express server listening on port %d in %s mode",
        this.address().port,
        app.settings.env
      );
    })
  )
  .catch((error) => console.log(error));
