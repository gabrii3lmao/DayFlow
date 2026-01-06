import type { Request, Response } from "express";
import Day from "../models/dayModel.js";

interface DayParams {
  dayId: string;
}

export default {
  async index(req: Request, res: Response): Promise<void> {
    const days = await Day.find({});
    res.json(days);
  },

  async showFormCreate(req: Request<DayParams>, res: Response): Promise<void> {
    const { dayId } = req.params;

    const day = await Day.findById(dayId);
    res.json(day);
  },
};
