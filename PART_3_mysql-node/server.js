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

// 🟢 PUBLIC ROUTES (NO TOKEN)
app.use("/api/auth", authRoutes);

// 🔒 PROTECT ALL OTHER ROUTES
app.use(authExpire);

// 🟡 PROTECTED ROUTES
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
