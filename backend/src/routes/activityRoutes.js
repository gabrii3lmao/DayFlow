const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
const homeController = require("../controllers/homeController");

router.get("/", homeController.index);

router.get("/days/:dayId/activities/new", homeController.showFormCreate);
router.post("/days/:dayId/activities", activityController.addActivity);
router.put(
  "/days/:dayId/activities/:activityId",
  activityController.updateActivity
);
router.delete(
  "/days/:dayId/activities/:activityId",
  activityController.deleteActivity
);

module.exports = router;
