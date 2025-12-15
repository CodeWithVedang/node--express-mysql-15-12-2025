import express from "express";
import { login, logout, getLogs } from "../controllers/authController.js";
import { authExpire } from "../middleware/authExpire.js";

const router = express.Router();

// public login route
router.post("/login", login);

// protected logout + logs
router.post("/logout", logout);
router.get("/logs", getLogs);

export default router;
