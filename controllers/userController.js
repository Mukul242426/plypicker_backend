import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";


export const register = async (req, res, next) => {
  try {
    const {email, password, role } = req.body;

    if (!email || !password || !role) {
      return next(AppError("All Fields are required", 400));
    }

    let user = await User.findOne({ email });
    if (user) {
      return next(AppError("User already exists", 400));
    }

    if(password.length<8){
      return next(AppError("Password must be atleast 8 characters long",400))
    }

    const adminExists = await User.exists({ role: 'admin' });

    if (adminExists && role === 'admin') {
      return next(AppError("Only one admin is allowed", 400));
    }

    const protectedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      email,
      password: protectedPassword,
      role
    });
    const jwtToken = jwt.sign({userId:user._id}, process.env.SECRET_KEY);

    res.status(200).json({
      success: true,
      message: "Signup Successfull",
      role:user.role,
      jwtToken,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(AppError("All Fields are required", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(AppError("Invalid email or password", 400));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(AppError("Invalid email or password", 400));
    }
    if(role!==user.role){
      return next(AppError("Invalid credentials",400))
    }
    const jwtToken = jwt.sign({userId:user._id}, process.env.SECRET_KEY);
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      role:user.role,
      jwtToken,
    });
  } catch (error) {
    next(error);
  }
};