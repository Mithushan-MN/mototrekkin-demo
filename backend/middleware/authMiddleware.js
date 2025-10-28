// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  console.log("protect: Processing request", { headers: req.headers });
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  console.log("protect: Received token", { token });

  if (!token) {
    console.log("protect: No token found");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  // SAFETY: Ensure JWT_SECRET exists
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing in environment!");
    return res.status(500).json({ message: "Server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("protect: Token decoded", { decoded });

    if (!decoded.id) {
      throw new Error("Token missing user ID");
    }

    req.user = { id: decoded.id, role: decoded.role || "user" };
    console.log("protect: Set req.user", { user: req.user });
    next();
  } catch (err) {
    console.error("protect: Invalid token:", err.message);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export const isAdmin = (req, res, next) => {
  console.log("isAdmin: Checking role", { user: req.user });
  if (!req.user || req.user.role !== "admin") {
    console.log("isAdmin: Access denied");
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  next();
};