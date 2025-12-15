// middleware/authExpire.js
import jwt from "jsonwebtoken";
import { AuthService } from "../services/authService.js";

export const authExpire = async (req, res, next) => {
  const header = req.headers.authorization;

  // Block all routes if no token present
  if (!header) {
    return res.status(401).json({
      success: false,
      message: "Access denied — Token required"
    });
  }

  const token = header.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    // 🔥 If token expired — auto logout + block request
    if (err && err.name === "TokenExpiredError") {
      const payload = jwt.decode(token);

      if (payload?.logId) {
        await AuthService.logout(payload.logId, true);
      }

      return res.status(440).json({
        success: false,
        message: "Session expired — Auto logout completed"
      });
    }

    // If token invalid
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    // Token valid
    req.user = decoded;
    next();
  });
};
