import jwt from "jsonwebtoken";
import { comparePassword } from "../helper/comparePass.js";
import User from "../models/userModels.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(201).send({ message: "Invalid email or password" });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(201).send({ message: "Invalid email or password." });
    }
    // Compare the provided password with the stored hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(201).send({ message: "Invalid email or password." });
    }

    // If the passwords match, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Token expires in 7days
    );

    res.status(201).send({
      success: true,
      message: "Login successful.",
      user: {
        name: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error in login controller",
      err,
    });
  }
};
