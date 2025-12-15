// models/userModel.js
// --------------------------------------------------
// USER MODEL (MySQL Queries + SRP Principles)
// --------------------------------------------------

import pool from "../config/db.js";

export const UserModel = {
  
  // -----------------------------
  // GET ALL USERS (Paginated)
  // -----------------------------
  async getAll(limit, offset) {
    limit = Number(limit);
    offset = Number(offset);

    const [rows] = await pool.query(
      "SELECT * FROM users LIMIT ? OFFSET ?",
      [limit, offset]
    );

    return rows;
  },

  // -----------------------------
  // GET USER BY ID
  // -----------------------------
  async getById(id) {
    const [rows] = await pool.query(
      `SELECT id, name, username, role, status FROM users WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  // -----------------------------
  // CREATE USER
  // -----------------------------
  async create({ name, username, password, role, status }) {
    const [result] = await pool.query(
      `
      INSERT INTO users (name, username, password, role, status)
      VALUES (?, ?, ?, ?, ?)
      `,
      [name, username, password, role, status]
    );

    return { id: result.insertId };
  },

  // -----------------------------
  // UPDATE USER
  // -----------------------------
  async update(id, { name, username, role, status }) {
    const [result] = await pool.query(
      `
      UPDATE users 
      SET name = ?, username = ?, role = ?, status = ?
      WHERE id = ?
      `,
      [name, username, role, status, id]
    );

    return { affectedRows: result.affectedRows };
  },

  // -----------------------------
  // DELETE USER
  // -----------------------------
  async delete(id) {
    const [result] = await pool.query(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );

    return { affectedRows: result.affectedRows };
  }
};
