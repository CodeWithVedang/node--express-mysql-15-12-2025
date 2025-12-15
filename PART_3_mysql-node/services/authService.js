// services/authService.js
import jwt from "jsonwebtoken";
import { AuthModel } from "../models/authModel.js";
import { LogModel } from "../models/logModel.js";


export const AuthService = {
  async login(username, password) {
    const user = await AuthModel.findByUsername(username);
    if (!user || user.password !== password) return null;
    const sessionId = await LogModel.createLoginLog(user.id);


    // Create login log entry
    const logId = await AuthModel.logLogin(user.id);

    // Create token with logId inside
    const token = jwt.sign(
      {
        user_id: user.id,
        session_id: sessionId
      },
      process.env.JWT_SECRET,
      { expiresIn: "60s" }
    );


    return { user, token, logId };
  },

  async logout(logId, expired = false) {
    await AuthModel.logLogout(logId, expired);
  }
};
