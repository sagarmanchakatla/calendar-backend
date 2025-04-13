import express from "express";
import { protect } from "../middleware/auth.middleware";
import { getGoals, createGoal, addTask } from "../controllers/goal.controller";

const router = express.Router();

router.route("/").get(protect, getGoals).post(protect, createGoal);

router.route("/:goalId/tasks").post(protect, addTask);

export default router;
