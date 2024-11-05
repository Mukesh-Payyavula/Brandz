
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "../utils/sendEmail.js"; 
import crypto from "crypto";

// @Desc Auth user & get token
// @Route /api/users/login
// @Method POST
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @Desc Register user
// @Route /api/users/register
// @Method POST
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(401);
    throw new Error("User already exists");
  }

  const otp = generateOtp();
  const user = await User.create({ name, email, password, otp });

  try {
    await sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);
    res.status(200).json({ success: true, message: "OTP sent to email", userId: user._id });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error sending OTP" });
  }
});

// @Desc Verify OTP
// @Route /api/users/verify-otp
// @Method POST
export const verifyOtp = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body;

  const user = await User.findById(userId);
  if (!user || user.otp !== otp) {
    res.status(401);
    throw new Error("Invalid OTP");
  }

  user.otp = undefined; // Clear the OTP
  await user.save();

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    },
  });
});

// @Desc Request password reset
// @Route /api/users/forgot-password
// @Method POST
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  try {
    await sendEmail(email, 'Password Reset', `You are receiving this email because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process: http://localhost:5000/reset-password/${resetToken}`);
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error sending email" });
  }
});

// @Desc Reset password
// @Route /api/users/reset-password
// @Method POST
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(401);
    throw new Error("Invalid or expired token");
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password has been reset successfully.",
  });
});

// @Desc Get user profile
// @Route /api/users/profile
// @Method GET
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

// @Desc Update profile
// @Route /api/users/profile
// @Method PUT
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const updatedUserProfile = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      password: req.body.password || user.password,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    user: {
      _id: updatedUserProfile._id,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      isAdmin: updatedUserProfile.isAdmin,
      token: generateToken(updatedUserProfile._id),
    },
  });
});

// @Desc Get users
// @Route /api/users
// @Method GET
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ success: true, users });
});

// @Desc Delete user
// @Route /api/users/:id
// @Method DELETE
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).json({ message: "User removed" });
});

// @Desc Get user by ID
// @Route /api/users/:id
// @Method GET
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  res.status(200).json({ success: true, user });
});

// @Desc Update user
// @Route /api/users/:id
// @Method PUT
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.status(200).json({ success: true, user: updatedUser });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});
