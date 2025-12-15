// controllers/authController.js
import { AuthService } from "../services/authService.js";

export const AuthController = {
  async login(req, res) {
    const { username, password } = req.body;

    const result = await AuthService.login(username, password);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid login",
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      token: result.token,
      logId: result.logId,
      user: result.user
    });
  },

  async logout(req, res) {
    const logId = req.user?.logId;

    if (!logId) {
      return res.status(400).json({
        success: false,
        message: "No active session found",
      });
    }

    await AuthService.logout(logId, false);

    return res.json({
      success: true,
      message: "Logout successful"
    });
  }
};
