import express from "express";
import { protect } from "../middleware/auth.middleware";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";

const router = express.Router();

router.route("/").get(protect, getEvents).post(protect, createEvent);

router.route("/:id").put(protect, updateEvent).delete(protect, deleteEvent);

export default router;
