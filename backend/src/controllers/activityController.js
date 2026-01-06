const Day = require("../models/dayModel");

module.exports = {
  async addActivity(req, res) {
    const { dayId } = req.params;
    const { title, durationMin } = req.body;
    try {
      const day = await Day.findById(dayId);
      if (!day) {
        return res.status(404).json({ error: "Day not found" });
      }
      day.activities.push({ title, durationMin });
      await day.save();
      res.status(201)
      res.redirect("/");
    } catch (error) {
      console.log(`There was an error trying to adding a new activity`);
      res.status(500).json({ error: "Cound't create a new activity" });
    }
  },

  async updateActivity(req, res) {
    const { dayId, activityId } = req.params;
    const { title, durationMin, completed } = req.body;

    try {
      const day = await Day.findById(dayId);
      if (!day) {
        return res.status(404).json({ error: "Day not found" });
      }
      const activity = day.activities.id(activityId);
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }

      if (title !== undefined) activity.title = title;
      if (durationMin !== undefined) activity.durationMin = durationMin;
      if(completed !== undefined) activity.completed = completed;
      await day.save();
      res.json(activity);

    } catch (error) {
      console.log(
        `There was an error trying to update the activities: ${error}`
      );
      res
        .status(500)
        .json({ error: "There was an error trying to update the activity" });
    }
  },

  async deleteActivity(req, res) {
    const { dayId, activityId } = req.params;
    try {
      const day = await Day.findById(dayId);
      if (!day) {
        return res.status(404).json({ error: "Day not found" });
      }
      day.activities.id(activityId)?.deleteOne();
      await day.save();
      res.status(204).send();
    } catch (error) {
      console.log(
        `There was an error trying to delete the activity: ${error}`
      );
      res
        .status(500)
        .json({ error: "There was an error trying to delete the activity" });
    }
  },
};
