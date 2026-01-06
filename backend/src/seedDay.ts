import Day from "./models/dayModel.js";
import type { Weekday } from "./models/dayModel.js";

const daysOfWeek: Weekday[] = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export default async function seedDays(): Promise<void> {
  for (const weekday of daysOfWeek) {
    await Day.updateOne(
      { weekday },
      { $setOnInsert: { weekday, activities: [] } },
      { upsert: true }
    );
  }
}
