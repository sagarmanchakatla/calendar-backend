import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface IGoal extends Document {
  user: string;
  title: string;
  color: string;
  createdAt: Date;
}

export interface ITask extends Document {
  goal: string;
  title: string;
  createdAt: Date;
}

export type EventCategory =
  | "exercise"
  | "eating"
  | "work"
  | "relax"
  | "family"
  | "social";

export interface IEvent extends Document {
  user: string;
  title: string;
  category: EventCategory;
  start: Date;
  end: Date;
  color?: string;
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: IUser;
}
