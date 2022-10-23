const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

router
  .route("/photo/:userId")
  .put(
    profileController.upload.single("photo"),
    profileController.updateProfilePhoto
  );

router.route("/:userId").put(profileController.updateProfile);

module.exports = router;
