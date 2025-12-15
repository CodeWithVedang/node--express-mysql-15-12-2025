import express from "express";
import { AuthController } from "../controllers/authController.js";
import { authExpireOptional } from "../middleware/authExpireOptional.js";

const router = express.Router();

// Login (NO token required)
router.post("/login", AuthController.login);

// Logout (token REQUIRED but should NOT block on expiration)
router.post("/logout", authExpireOptional, AuthController.logout);

export default router;
