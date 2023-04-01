const express = require('express');
const router = express.Router();
const appController = require('../controllers/apps.controller');

router.post("/list", appController.listApplications);
router.post("/view", appController.viewApplication);
router.post("/add", appController.createApplication);
router.post("/update", appController.updateApplication);
// router.post("/delete", appController.deleteApplication);

module.exports = router;