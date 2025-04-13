import jwt from "jsonwebtoken";
import { IUser } from "../types/customTypes";

const generateToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export default generateToken;
