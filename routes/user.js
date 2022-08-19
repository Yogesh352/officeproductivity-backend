import express from "express";
const router = express.Router();

import { getUser, signin, signup, getAllUsers } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", getUser);
router.get("/allusers", getAllUsers);

export default router;
