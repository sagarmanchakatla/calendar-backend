import mongoose, { Document } from "mongoose";
import { IGoal } from "../types/customTypes";

const goalSchema = new mongoose.Schema<IGoal>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.model<IGoal>("Goal", goalSchema);

export default Goal;
