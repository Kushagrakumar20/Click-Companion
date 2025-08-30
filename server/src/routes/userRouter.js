const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const oauthGoogleController = require("../controllers/oauthController.google");
const { getRecommendations } = require("../controllers/recommendationAlgo");
const { likeUser, rejectUser } = require("../controllers/matchController");
const { setPreferences } = require("../controllers/userController");

const router = express.Router();

// Auth Routes
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/signup", authController.signup);
router.post("/verifyEmail", authController.verifyEmail);
router.get("/getMe", authController.isLoggedIn);

// OAuth Routes
router.get("/auth/google/url", oauthGoogleController.getGoogleUrl);
router.get("/auth/google", oauthGoogleController.authGoogle);

// User Profile Routes
router.post("/updateDetails", authController.protect, userController.updateUserDetails);
router.post("/updateProfilePic", authController.protect, userController.updateProfilePic);
router.post("/addPhotoLink", authController.protect, userController.addPhotoLink);
router.post("/deletePhotoLink", authController.protect, userController.deletePhotoLink);
router.post("/postLocation", authController.protect, userController.setLocation);
router.post("/setPreferences", authController.protect, setPreferences);

// Subscription Routes
router.post("/buySubscription", authController.protect, userController.buySubscription);
router.post("/validateSubscription", authController.protect, userController.validateSubscription);

// Social & Matching Routes
router.post("/getRecommendations", authController.protect, getRecommendations);
router.put("/likeUser", authController.protect, likeUser);
router.put("/rejectUser", authController.protect, rejectUser);

// External Integrations
router.post("/fetchLeetcodeData", authController.protect, userController.fetchLeetcodeData);

// Test Route
router.get("/test", (req, res) => {
  res.status(200).json({ status: "success", message: "User test successful" });
});

module.exports = router;
