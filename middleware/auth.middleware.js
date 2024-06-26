import jwt, { decode } from "jsonwebtoken";
import User from "../models/userModels.js";

//protected Route
export const requireSignIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .send({ message: "Authorization header is missing" });
    }

    const token = authHeader;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Token is missing from the authorization header" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);

    // req.user = decoded; // Attach the decoded token payload to the request object
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

//Middleware for admin
export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User information not found",
      });
    }
    // console.log(req.user);
    // res.send(req.user.userId);
    const user = await User.findById(req.user.userId);

    // console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(201).json({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (err) {
    console.error("Error in admin middleware:", err);
    res.status(500).json({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
