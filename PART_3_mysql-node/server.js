import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { authExpire } from "./middleware/authExpire.js";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🟢 PUBLIC ROUTES
// Login MUST stay public
app.use("/api/auth", authRoutes); // login is inside this router

// 🔒 PROTECTED ROUTES (everything else)
app.use(authExpire);

// 🟡 PROTECTED AUTH ROUTES (logout + logs)
app.use("/api/auth", authRoutes);

// 🟡 PROTECTED USER ROUTES
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
