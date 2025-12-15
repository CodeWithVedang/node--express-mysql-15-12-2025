import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { authExpire } from "./middleware/authExpire.js";

// ✅ IMPORT login DIRECTLY
import { login } from "./controllers/authController.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 PUBLIC ROUTE — LOGIN ONLY
app.post("/api/auth/login", login);

// 🔒 APPLY TOKEN CHECK FOR ALL ROUTES AFTER LOGIN
app.use(authExpire);

// 🔐 PROTECTED AUTH ROUTES (logout + logs)
app.use("/api/auth", authRoutes);

// 🔐 PROTECTED USER ROUTES
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
