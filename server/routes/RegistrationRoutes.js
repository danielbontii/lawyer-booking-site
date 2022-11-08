const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registrationController");

router.route("/user-types").put(registrationController.userTypes);

router.route("/").post(registrationController.register);

router
  .route("/verify-lawyer/:userId")
  .put(registrationController.verifyRegistration);

module.exports = router;
