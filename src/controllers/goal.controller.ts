import { Request, Response, NextFunction } from "express";
import Goal from "../models/goal.model";
import Task from "../models/task.model";
import { ErrorResponse } from "../utils/errorResponse";

// @desc    Get all goals with tasks
// @route   GET /api/goals
// @access  Private
const getGoals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const goals = await Goal.find({ user: (req as any).user._id });
    const goalsWithTasks = await Promise.all(
      goals.map(async (goal) => {
        const tasks = await Task.find({ goal: goal._id });
        return {
          ...goal.toObject(),
          tasks,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: goalsWithTasks.length,
      data: goalsWithTasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a goal
// @route   POST /api/goals
// @access  Private
const createGoal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, color } = req.body;

    const goal = await Goal.create({
      user: (req as any).user._id,
      title,
      color,
    });

    res.status(201).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a task to a goal
// @route   POST /api/goals/:goalId/tasks
// @access  Private
const addTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const goal = await Goal.findById(req.params.goalId);

    if (!goal) {
      return next(new ErrorResponse("Goal not found", 404));
    }

    // Make sure user owns the goal
    if (goal.user.toString() !== (req as any).user._id) {
      return next(
        new ErrorResponse("Not authorized to add task to this goal", 401)
      );
    }

    const task = await Task.create({
      goal: goal._id,
      title: req.body.title,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export { getGoals, createGoal, addTask };
