const { Router } = require("express");
const express = require("express");
const router = express.Router();

const registrationController = require("../controllers/registrationController");

router.route("/user-types").get(registrationController.userTypes);
router
  .route("/user-types/client-id")
  .get(registrationController.clientUserTypeId);
router
  .route("/user-types/lawyer-id")
  .get(registrationController.lawyerUserTypeId);

router.route("/").post(registrationController.register);

module.exports = router;
