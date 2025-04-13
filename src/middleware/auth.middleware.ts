import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/customTypes";
import User from "../models/user.model";
import { ErrorResponse } from "../utils/errorResponse";

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};

export { protect };
