// controllers/authController.js

import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { LogModel } from "../models/logModel.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "Invalid login" });
    }

    const user = rows[0];

    // Create login_logs entry
    const sessionId = await LogModel.createLoginLog(user.id);

    const token = jwt.sign(
      {
        user_id: user.id,
        role: user.role,
        session_id: sessionId
      },
      process.env.JWT_SECRET,
      { expiresIn: "60s" } // 1-minute expiration
    );

    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username, role: user.role }
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// -------------------------
// LOGOUT — manual logout
// -------------------------
export const logout = async (req, res) => {
  try {
console.log("Manual Logout session_id =", req.user.session_id);

await LogModel.setLogout(req.user.session_id);

console.log("Manual logout DB update done");

    res.json({
      success: true,
      message: "Logged out successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};



// -------------------------
// GET LOGIN LOGS
// -------------------------
export const getLogs = async (req, res) => {
  try {
    const logs = await LogModel.getAll();
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
