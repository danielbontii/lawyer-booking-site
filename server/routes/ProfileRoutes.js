const { Router } = require("express");
const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

router
  .route("/photo/:userId")
  .post(
    profileController.upload.single("photo"),
    profileController.updateProfilePhoto
  );

module.exports = router;
