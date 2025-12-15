// controllers/userController.js

import { UserModel } from "../models/userModel.js";

export const UserController = {
  async getAll(req, res) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const users = await UserModel.getAll(limit, offset);

      res.json({
        success: true,
        page,
        limit,
        data: users
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const user = await UserModel.getById(req.params.id);
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async create(req, res) {
    try {
      const data = await UserModel.create(req.body);
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const result = await UserModel.update(req.params.id, req.body);
      res.json({ success: true, message: "User updated", result });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const result = await UserModel.delete(req.params.id);
      res.json({ success: true, message: "User deleted", result });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};
