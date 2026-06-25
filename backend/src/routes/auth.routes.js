const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { authenticate } = require("../middleware/auth.middleware");

// Validation rules
const registerValidation = [
  body("name", "Name is required").not().isEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
];

const loginValidation = [
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists()
];

// Routes
router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.getMe);

module.exports = router;
