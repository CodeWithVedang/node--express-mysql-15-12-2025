// models/logModel.js
// Handles login_logs table operations

import pool from "../config/db.js";

export const LogModel = {
  
  // Create login entry
  async createLoginLog(user_id) {
    const [result] = await pool.query(
      `INSERT INTO login_logs (user_id, login_time, expired)
       VALUES (?, NOW(), 0)`,
      [user_id]
    );
    return result.insertId; // session_id
  },

  // Manual logout
async setLogout(session_id) {
  console.log("Manual logout called for session:", session_id);

  const [result] = await pool.query(
    `UPDATE login_logs
     SET logout_time = NOW(), expired = 0
     WHERE id = ?`,
    [session_id]
  );

  console.log("Manual logout DB result:", result);
}
,

async setLogoutExpired(session_id) {
  console.log("AUTO logout called for session:", session_id);

  const [result] = await pool.query(
    `UPDATE login_logs
     SET logout_time = NOW(), expired = 1
     WHERE id = ?`,
    [session_id]
  );

  console.log("AUTO logout DB result:", result);
}
,

  // Admin view logs
  async getAll() {
    const [rows] = await pool.query(`
      SELECT logs.id, logs.user_id, users.username,
             logs.login_time, logs.logout_time, logs.expired
      FROM login_logs logs
      LEFT JOIN users ON logs.user_id = users.id
      ORDER BY logs.id DESC
    `);
    return rows;
  }
};
