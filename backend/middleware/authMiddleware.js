// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwt";

export const protect = (req, res, next) => {
  console.log("protect: Processing request", { headers: req.headers });
  const token = req.headers.authorization?.split(" ")[1];
  console.log("protect: Received token", { token });
  if (!token) {
    console.log("protect: No token found in headers");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("protect: Decoded token successfully", { decoded });
    if (!decoded.id) {
      throw new Error("Token payload missing id field");
    }
    req.user = { id: decoded.id, role: decoded.role || "user" }; // Include role
    console.log("protect: Set req.user", { user: req.user });
    next();
  } catch (err) {
    console.error("protect: Token verification error:", err.message);
    res.status(401).json({ message: `Not authorized, invalid token: ${err.message}` });
  }
};

export const isAdmin = (req, res, next) => {
  console.log("isAdmin: Checking role", { user: req.user });
  if (!req.user || req.user.role !== "admin") {
    console.log("isAdmin: Access denied", { user: req.user });
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};