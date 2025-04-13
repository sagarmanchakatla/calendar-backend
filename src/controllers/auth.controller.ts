import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { ErrorResponse } from "../utils/errorResponse";
import generateToken from "../utils/jwt";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById((req as any).user._id).select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, getMe };
