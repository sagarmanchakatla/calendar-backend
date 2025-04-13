import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../utils/errorResponse";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorHandler(err, res);
};

export default errorMiddleware;
