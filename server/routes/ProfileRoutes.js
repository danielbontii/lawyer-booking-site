const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

router
  .route("/update-profile/photo/:userId")
  .put(
    profileController.upload.single("photo"),
    profileController.updateProfilePhoto
  );

router.route("/update-profile/:userId").put(profileController.updateProfile);

router.route("/lawyers").get(profileController.getLawyerProfiles);

router.route("/clients").get(profileController.getClientProfiles);

router.route("/unverified-lawyers").get(profileController.getUnverifiedLawyerProfiles);

module.exports = router;
