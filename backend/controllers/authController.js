import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretjwt";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).json({
      message: "Signup successful",
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role || "user" },
      process.env.JWT_SECRET || "supersecretjwt",
      { expiresIn: "30d" }
    );
    console.log("authController: Login successful", { userId: user._id, role: user.role });
    res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error("authController: Login error", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PROFILE
export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ id: user._id, fullName: user.fullName, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

// ADMIN: Promote user
export const makeAdmin = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();

    res.status(200).json({ message: `${user.fullName} promoted to admin` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




//  Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:5174"}/reset-password/${resetToken}`;

    // Send email 
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ADMIN: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('fullName email role createdAt') // ← EXPLICITLY INCLUDE
      .sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error('getAllUsers error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: CREATE USER (manual)
// ─────────────────────────────────────────────────────────────────────────────
export const createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ message: "Name, email and password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,     // ← SAVED
      email,
      password: hashed,
      role: role || "user",
    });

    // Send back fullName and createdAt
    res.status(201).json({
      message: "User created",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt, // ← INCLUDE
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: UPDATE USER
// ─────────────────────────────────────────────────────────────────────────────
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, role, password } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ message: "Email already in use" });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.role = role || user.role;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.json({
      message: "User updated",
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN: DELETE USER
// ─────────────────────────────────────────────────────────────────────────────
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent self-delete
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }

    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};