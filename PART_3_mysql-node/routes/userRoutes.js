// routes/userRoutes.js
import express from "express";
import { UserController } from "../controllers/userController.js";

const router = express.Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", UserController.create);        // ✅ ADD THIS
router.put("/:id", UserController.update);      // optional
router.delete("/:id", UserController.remove);   // optional

export default router;
