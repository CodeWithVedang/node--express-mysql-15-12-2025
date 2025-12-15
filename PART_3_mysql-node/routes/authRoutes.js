import express from "express";
import { logout, getLogs } from "../controllers/authController.js";

const router = express.Router();

// ❌ DO NOT ADD LOGIN HERE — login MUST stay public in server.js

// 🔐 PROTECTED ROUTES
router.post("/logout", logout);
router.get("/logs", getLogs);

export default router;
