const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get("/list", userController.listUser);
router.get("/view", userController.viewUser);
router.post("/add", userController.createUser);
router.put("/update", userController.updateUser);
router.delete("/delete", userController.deleteUser);

module.exports = router;