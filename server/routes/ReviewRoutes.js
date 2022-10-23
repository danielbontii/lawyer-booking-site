const express = require("express");
const router = express.Router();

const reviewsController = require("../controllers/reviewsController");

router.route("/").post(reviewsController.addReview);

module.exports = router;
