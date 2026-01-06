import type { Request, Response } from "express";
import Day from "../models/dayModel.js";

// Tipos auxiliares para params
interface DayParams {
  dayId: string;
}

interface ActivityParams extends DayParams {
  activityId: string;
}

// Tipos do body
interface ActivityBody {
  title?: string;
  durationMin?: number;
  completed?: boolean;
}

export default {
  async addActivity(
    req: Request<DayParams, unknown, ActivityBody>,
    res: Response
  ): Promise<void> {
    const { dayId } = req.params;
    const { title, durationMin } = req.body;

    try {
      const day = await Day.findById(dayId);
      if (!day) {
        res.status(404).json({ error: "Day not found" });
        return;
      }

      day.activities.push({ title, durationMin });
      await day.save();

      res.status(201).json({ message: "Activity created" });
    } catch (error) {
      console.error("There was an error trying to add a new activity", error);
      res.status(500).json({ error: "Couldn't create a new activity" });
    }
  },

  async updateActivity(
    req: Request<ActivityParams, unknown, ActivityBody>,
    res: Response
  ): Promise<void> {
    const { dayId, activityId } = req.params;
    const { title, durationMin, completed } = req.body;

    try {
      const day = await Day.findById(dayId);
      if (!day) {
        res.status(404).json({ error: "Day not found" });
        return;
      }

      const activity = day.activities.id(activityId);
      if (!activity) {
        res.status(404).json({ error: "Activity not found" });
        return;
      }

      if (title !== undefined) activity.title = title;
      if (durationMin !== undefined) activity.durationMin = durationMin;
      if (completed !== undefined) activity.completed = completed;

      await day.save();
      res.json(activity);
    } catch (error) {
      console.error("There was an error trying to update the activity", error);
      res
        .status(500)
        .json({ error: "There was an error trying to update the activity" });
    }
  },

  async deleteActivity(
    req: Request<ActivityParams>,
    res: Response
  ): Promise<void> {
    const { dayId, activityId } = req.params;

    try {
      const day = await Day.findById(dayId);
      if (!day) {
        res.status(404).json({ error: "Day not found" });
        return;
      }

      const activity = day.activities.id(activityId);
      if (!activity) {
        res.status(404).json({ error: "Activity not found" });
        return;
      }
      activity.deleteOne();
      await day.save();

      res.status(204).send();
    } catch (error) {
      console.error("There was an error trying to delete the activity", error);
      res
        .status(500)
        .json({ error: "There was an error trying to delete the activity" });
    }
  },
};
