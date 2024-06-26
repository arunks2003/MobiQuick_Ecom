import User from "../models/userModels.js";
import bcrypt from "bcryptjs";

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, ans, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!ans) {
      res.send(400).send({ message: "Ans is required" });
    }
    if (!newPassword) {
      res.send(400).send({ message: "New Password is required" });
    }
    //check
    const user = await User.findOne({ email, ans });
    //validate
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong email or ans" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(user._id, { password: passwordHash });
    res
      .status(200)
      .send({ success: true, message: "Password reset successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Something wen wrong", err });
  }
};
