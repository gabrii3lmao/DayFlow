const Day = require("./models/dayModel");

const daysOfWeek = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];


async function seedDays() {
  for (const weekday of daysOfWeek) {
    await Day.updateOne(
      { weekday },
      { $setOnInsert: { weekday, activities: [] } },
      { upsert: true }
    );
  }
}

module.exports = seedDays;