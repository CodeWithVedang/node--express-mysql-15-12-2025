// middleware/authExpireOptional.js
import jwt from "jsonwebtoken";

export const authExpireOptional = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return next(); // allow logout without token

  const token = header.split(" ")[1];

  const decoded = jwt.decode(token);
  req.user = decoded;
  next();
};
