const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
require("dotenv").config();

// Middleware to authenticate user via JWT
exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded.id; // Store ID for use in next middleware/routes

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified",
      });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};
