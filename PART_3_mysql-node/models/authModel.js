// models/authModel.js
import pool from "../config/db.js";

export const AuthModel = {
  async findByUsername(username) {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [username]
    );
    return rows[0];
  },

  async logLogin(userId) {
    const [result] = await pool.query(
      "INSERT INTO login_logs (user_id, login_time) VALUES (?, NOW())",
      [userId]
    );

    return result.insertId;
  },

  async logLogout(logId, expired = false) {
    await pool.query(
      "UPDATE login_logs SET logout_time = NOW(), expired = ? WHERE id = ?",
      [expired, logId]
    );
  }
};
