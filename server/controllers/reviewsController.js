const { validateAddReview } = require("../utils/validation");
const { StatusCodes } = require("http-status-codes");
const pool = require("../utils/db");

exports.addReview = async (req, res, next) => {
  console.log(req.body);
  try {
    const reviewDetails = await validateAddReview.validateAsync(req.body, {
      abortEarly: false,
    });

    const { lawyerId, reviewerId, rating, review } = reviewDetails;

    const addReviewQuery = await pool.query(
      "INSERT INTO reviews (user_id, reviewer_id, rating, review) VALUES($1, $2, $3, $4)",
      [lawyerId, reviewerId, rating, review]
    );

    if (addReviewQuery.rowCount > 0) {
      //notify lawyer in the future //
      res.status(StatusCodes.OK).json("review added successfully");
    }
  } catch (err) {
    if (err.isJoi === true) {
      return res.status(StatusCodes.BAD_REQUEST).json(err.details);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong. Please try again later");
  }
};
