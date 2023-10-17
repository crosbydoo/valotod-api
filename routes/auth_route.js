const router = require("express").Router();
const authController = require("../controllers/auth_controller");

// Registrasi
router.post("/register", authController.registerUser);

//login
router.post("/login", authController.loginUser);

module.exports = router