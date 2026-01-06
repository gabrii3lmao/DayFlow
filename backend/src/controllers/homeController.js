const activityController = require("./activityController");
const Day = require("../models/dayModel");

module.exports = {
  async index(req, res) {
    const days = await Day.find({});
    res.render("index", { days });
  },

  async showFormCreate(req, res) {
    const day = await Day.findById(req.params.dayId);
    res.render("newActivity", { day });
  },
};
