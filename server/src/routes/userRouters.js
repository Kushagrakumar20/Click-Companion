const express = require("express");
const userController = require("./../controllers/userController"); //this format, instead of using path, helps intellisense
const authController = require("./../controllers/authController");
const oauthGoogleController = require("./../controllers/aouthController.google");
const router = express.Router();

// get basic details about a user
router.get("/test", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "user test successful",
  });
});

router.post("/login", authController.login); //ok
router.post("/logout", authController.logout); //ok
router.get("/getMe", authController.isLoggedIn); //ok
router.post("/signup", authController.signup); //ok
router.post("/verifyEmail", authController.verifyEmail); //ok
router.post(
  "/fetchLeetcodeData",
  authController.protect,
  userController.fetchLeetcodeData
);

//for google oauth
router.get("/auth/google/url", oauthGoogleController.getGoogleUrl);
router.get("/auth/google/", oauthGoogleController.authGoogle);