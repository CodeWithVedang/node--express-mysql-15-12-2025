import pool from "../config/db.js";

export const UserModel = {
  // GET ALL USERS
  async getAll(limit, offset) {
    const [rows] = await pool.query(
      "SELECT id, username, password, name, role, status FROM users LIMIT ? OFFSET ?",
      [limit, offset]
    );
    return rows;
  },

  // GET ONE USER
  async getById(id) {
    const [rows] = await pool.query(
      "SELECT id, username, password, name, role, status FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  // CREATE USER (Plain Text Password)
  async create({ username, password, name, role }) {
    const [result] = await pool.query(
      `INSERT INTO users (username, password, name, role, status)
       VALUES (?, ?, ?, ?, 'active')`,
      [username, password, name, role]
    );

    return result.insertId;
  },

  // UPDATE USER (ALL FIELDS EDITABLE, NO HASHING)
  async update(id, { username, password, name, role, status }) {
    let fields = [];
    let values = [];

    if (username) { fields.push("username = ?"); values.push(username); }
    if (password) { fields.push("password = ?"); values.push(password); }
    if (name)     { fields.push("name = ?");     values.push(name); }
    if (role)     { fields.push("role = ?");     values.push(role); }
    if (status)   { fields.push("status = ?");   values.push(status); }

    values.push(id);

    const [result] = await pool.query(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
      values
    );

    return { affectedRows: result.affectedRows };
  },

  // DELETE USER
  async delete(id) {
    const [result] = await pool.query(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return { affectedRows: result.affectedRows };
  }
};
