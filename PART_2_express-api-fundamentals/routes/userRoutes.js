import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// CRUD Routes
router.get("/", getUsers);          // ?query=params
router.get("/:id", getUser);        // /users/3
router.post("/", upload.single("avatar"), createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
