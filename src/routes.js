const express = require("express");
const DashboardController = require("./controllers/DashboardController");
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");
const router = new express.Router();

router.get("/", DashboardController.index);

router.get("/job", JobController.create);
router.post("/job", JobController.save);
router.post("/job/start/:id", JobController.start);
router.get("/job/edit/:id", JobController.show);
router.post("/job/edit/:id", JobController.update);
router.post("/job/delete/:id", JobController.delete);

router.get("/profile", ProfileController.index);
router.post("/profile", ProfileController.update);

module.exports = router;
