// middleware/authExpire.js
import jwt from "jsonwebtoken";
import { LogModel } from "../models/logModel.js";

export const authExpire = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied — Token required"
      });
    }

    // ---------------------------
    // 1️⃣ Decode token
    // ---------------------------
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      ignoreExpiration: true
    });

    // DEBUG (correct location)
    console.log("Decoded token:", decoded);
    console.log("Session ID:", decoded.session_id);

    // ---------------------------
    // 2️⃣ Check expiration
    // ---------------------------
    const now = Math.floor(Date.now() / 1000);
    const expired = decoded.exp < now;

    if (expired) {
      console.log("⚠️ Token expired! Logging out session:", decoded.session_id);

      await LogModel.setLogoutExpired(decoded.session_id);

      return res.status(401).json({
        success: false,
        message: "Session expired"
      });
    }

    req.user = decoded;
    next();

  } catch (err) {
    console.log("AuthExpire Error:", err);
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};
