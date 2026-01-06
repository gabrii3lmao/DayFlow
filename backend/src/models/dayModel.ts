import { Schema, model, Types } from "mongoose";
import type { HydratedDocument } from "mongoose";
/* =====================
   Activity
===================== */

export interface Activity {
  _id: Types.ObjectId;
  title?: string;
  durationMin?: number;
  completed: boolean;
}

const activitySchema = new Schema<Activity>(
  {
    title: { type: String },
    durationMin: { type: Number },
    completed: { type: Boolean, default: false },
  },
  { _id: true }
);

/* =====================
   Day
===================== */

export type Weekday =
  | "Segunda"
  | "Terça"
  | "Quarta"
  | "Quinta"
  | "Sexta"
  | "Sábado"
  | "Domingo";

export interface Day {
  weekday: Weekday;
  activities: Types.DocumentArray<Activity>;
}

export type DayDocument = HydratedDocument<Day>;

const daySchema = new Schema<Day>({
  weekday: {
    type: String,
    enum: [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ],
    unique: true,
    required: true,
  },
  activities: [activitySchema],
});

export default model<Day>("Day", daySchema);
