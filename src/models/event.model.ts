import mongoose, { Document } from "mongoose";
import { IEvent, EventCategory } from "../types/customTypes";

const eventSchema = new mongoose.Schema<IEvent>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["exercise", "eating", "work", "relax", "family", "social"],
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  color: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
