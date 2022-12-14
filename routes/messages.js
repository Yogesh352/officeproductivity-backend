import express from "express";
import { getMessage, postMessage } from "../controllers/messages.js";

const router = express.Router();

router.post("/", postMessage);
router.get("/:conversationId", getMessage);

export default router;
