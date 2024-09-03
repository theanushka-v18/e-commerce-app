const express = require("express");
const {jwtAuthMiddleware} = require("../jwt.js");

const passport = require("passport");
const { handleRegister, handleLogin, getUserProfile, handlePassportAuth, handlePayment, handleUpdatePassword, handleSendOtp, handleUpdateEmail } = require("../controllers/authController.js");
const LocalStrategy = require("passport-local").Strategy;

const router = express.Router();

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    handlePassportAuth
  )
);
const localAuthMiddleware = passport.authenticate("local", { session: false });

router.post("/register", handleRegister)
router.post("/login", jwtAuthMiddleware, handleLogin);
router.get('/profile', jwtAuthMiddleware, getUserProfile);
router.put('/payment', handlePayment);
router.put('/updatePassword', handleUpdatePassword);
router.post('/sendOtp', handleSendOtp);
router.put('/updateEmail', handleUpdateEmail);

module.exports = router;
