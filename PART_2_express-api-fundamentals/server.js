import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// ---------------------------
// GLOBAL MIDDLEWARE
// ---------------------------
app.use(express.json()); // Body parser
app.use(morgan("dev"));  // Logging

// Custom middleware
app.use((req, res, next) => {
  console.log(`Custom Middleware → ${req.method} ${req.url}`);
  next();
});

// ---------------------------
// ROUTES
// ---------------------------
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Express.js Fundamentals API running 🚀" });
});

// ---------------------------
// ERROR HANDLING MIDDLEWARE
// ---------------------------
app.use(errorHandler);

// ---------------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
