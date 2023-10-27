const express = require('express');
const router = express.Router();

const userController = require("../controllers/user_controller");
const { verifyAndAuthorization, verifyToken, verifyAndAdmin } = require("../middleware/auth_middleware");

// Update User
router.put("/:id", verifyToken, userController.updateUser);

// dELETE User
router.delete("/:id", verifyToken, userController.deleteUser);

// Get User
router.get("/:id", verifyAndAuthorization, userController.getUser);

// Get User All
router.get("/", verifyAndAdmin, userController.getAllUser);


module.exports = router