import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Hardcoded Superadmin
const SUPERADMIN = {
  name: "Super Admin",
  email: "superadmin@onextel.com",
  password: "Super@123", // Hardcoded password
  role: "superadmin",
};

// Helper to allow only onextel emails
const isOnextelEmail = (email) => /^[a-zA-Z0-9._%+-]+@onextel\.com$/.test(email);

//
// ========== SIGNIN ==========
//
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required." });

    // Check if superadmin
    if (email === SUPERADMIN.email && password === SUPERADMIN.password) {
      return res.status(200).json({
        message: "Sign-in successful.",
        id: "superadmin-id",
        name: SUPERADMIN.name,
        email: SUPERADMIN.email,
        role: SUPERADMIN.role,
      });
    }

    // Restrict domain for normal users
    if (!isOnextelEmail(email))
      return res.status(400).json({ message: "Only @onextel.com emails are allowed." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password." });

    res.status(200).json({
      message: "Sign-in successful.",
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error("Sign-in error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//
// ========== SIGNUP ==========
//
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).json({ message: "All fields required" });

    if (!isOnextelEmail(email))
      return res.status(400).json({ message: "Only @onextel.com emails are allowed." });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already exists" });

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//
// ========== RESET PASSWORD ==========
//
router.post("/reset-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!email || !oldPassword || !newPassword || !confirmNewPassword)
      return res.status(400).json({ message: "All fields are required." });

    if (newPassword !== confirmNewPassword)
      return res.status(400).json({ message: "New passwords do not match." });

    if (email === SUPERADMIN.email)
      return res.status(403).json({ message: "Superadmin password cannot be reset." });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(401).json({ message: "Old password is incorrect." });

    user.password = newPassword; // hashed in pre-save
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

//
// ========== USER MANAGEMENT ==========
//

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Update user
router.put("/users/:id", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!isOnextelEmail(email))
      return res.status(400).json({ message: "Only @onextel.com emails are allowed." });

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Failed to update user" });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

export default router;
