import bcrypt from "bcryptjs";
import validator from "validator";
import User from "../models/userModels.js";

const register = async (req, res) => {
  const { username, email, password, phone, address, ans } = req.body;
  // console.log("Request body:", req.body);

  // Basic validation
  if (!username || !email || !password) {
    return res
      .status(400)
      .send({ message: "Username, email, and password are required." });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .send({ success: "false", message: "Invalid email format." });
  }

  if (!validator.isLength(password, { min: 6 })) {
    return res
      .status(400)
      .send({ message: "Password must be at least 6 characters long." });
  }

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(201)
        .send({ success: false, message: "Username or email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      phone,
      address,
      ans,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully.",
      newUser,
    });
  } catch (error) {
    res.status(500).send({ message: "Server error. Please try again later." });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await User.findById(req.user.userId);
    // console.log(user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Password validation
    if (password && password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Hash new password if provided
    let passwordHash = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password, salt);
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name: name || user.name,
        email: email || user.email,
        password: passwordHash,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Updating Profile",
      error: error.message,
    });
  }
};

export default register;
