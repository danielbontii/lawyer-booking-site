const express = require("express");
const router = express.Router();

const bookingsController = require("../controllers/bookingsController");

router.route("/").get(bookingsController.getBookings);
router.route("/book-lawyer").post(bookingsController.bookLawyer);

module.exports = router;
