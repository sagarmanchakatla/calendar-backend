import mongoose, { Document } from "mongoose";
import { ITask } from "../types/customTypes";

const taskSchema = new mongoose.Schema<ITask>({
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
