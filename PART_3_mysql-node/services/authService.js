// services/authService.js
import jwt from "jsonwebtoken";
import { AuthModel } from "../models/authModel.js";

export const AuthService = {
  async login(username, password) {
    const user = await AuthModel.findByUsername(username);
    if (!user || user.password !== password) return null;

    // Create login log entry
    const logId = await AuthModel.logLogin(user.id);

    // Create token with logId inside
    const token = jwt.sign(
      { id: user.id, username: user.username, logId },
      process.env.JWT_SECRET,
      { expiresIn: "120s" }
    );

    return { user, token, logId };
  },

  async logout(logId, expired = false) {
    await AuthModel.logLogout(logId, expired);
  }
};
