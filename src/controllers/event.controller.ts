import { Request, Response, NextFunction } from "express";
import Event from "../models/event.model";
import { ErrorResponse } from "../utils/errorResponse";
import { IEvent, EventCategory } from "../types/customTypes";

// @desc    Get all events
// @route   GET /api/events
// @access  Private
const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Event.find({ user: (req as any).user._id });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private
const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, category, start, end, color } = req.body;

    const event = await Event.create({
      user: (req as any).user._id,
      title,
      category,
      start,
      end,
      color,
    });

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return next(new ErrorResponse("Event not found", 404));
    }

    // Make sure user owns the event
    if (event.user.toString() !== (req as any).user._id) {
      return next(
        new ErrorResponse("Not authorized to update this event", 401)
      );
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(new ErrorResponse("Event not found", 404));
    }

    // Make sure user owns the event
    if (event.user.toString() !== (req as any).user._id) {
      return next(
        new ErrorResponse("Not authorized to delete this event", 401)
      );
    }

    await event.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

export { getEvents, createEvent, updateEvent, deleteEvent };
