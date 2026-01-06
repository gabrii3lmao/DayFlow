import { Router } from "express";
import activityController from "../controllers/activityController.js";
import homeController from "../controllers/homeController.js";

const router = Router();


router.get("/", homeController.index);

router.get(
  "/days/:dayId/activities/new",
  homeController.showFormCreate
);

router.post(
  "/days/:dayId/activities",
  activityController.addActivity
);

router.put(
  "/days/:dayId/activities/:activityId",
  activityController.updateActivity
);

router.delete(
  "/days/:dayId/activities/:activityId",
  activityController.deleteActivity
);

export default router;
