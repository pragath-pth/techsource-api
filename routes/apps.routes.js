const express = require('express');
const router = express.Router();
const appController = require('../controllers/apps.controller');

router.post("/list", appController.listApplications);
router.post("/view", appController.viewApplication);
router.post("/add", appController.createApplication);
router.put("/update", appController.updateApplication);
router.delete("/delete", appController.deleteApplication);

module.exports = router;