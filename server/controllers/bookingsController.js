const pool = require("../utils/db");
const { StatusCodes } = require("http-status-codes");
const { validateBooking } = require("../utils/validation");

exports.bookLawyer = async (req, res, next) => {
  try {
    const bookingDetails = await validateBooking.validateAsync(req.body, {
      abortEarly: false,
    });

    //check if lawyer is already booked before in future//

    const {
      caseTitle,
      caseDescription,
      startDate,
      endDate,
      amount,
      clientId,
      lawyerId,
    } = bookingDetails;

    const saveBookingQuery = await pool.query(
      "INSERT INTO bookings " +
        "(case_title, case_description, start_date, end_date, amount, client_id, lawyer_id) " +
        "VALUES($1, $2, $3, $4, $5, $6, $7)",
      [
        caseTitle,
        caseDescription,
        startDate,
        endDate,
        amount,
        clientId,
        lawyerId,
      ]
    );

    if (saveBookingQuery.rowCount > 0) {
      res.status(StatusCodes.OK).json("lawyer booked successfully");
    }
  } catch (err) {
    console.log(err.message);
    if (err.isJoi === true) {
      return res.status(StatusCodes.BAD_REQUEST).json(err.details);
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Something went wrong. Please try again later");
  }
};

const getUserName = async (userId) => {
  console.log("here");
  const nameQuery = await pool.query(
    "SELECT CONCAT(first_name, ' ', other_names, ' ', last_name) " +
      "AS name FROM profiles WHERE user_id = $1",
    [userId]
  );
  return nameQuery.rows[0]["name"];
};

exports.getBookings = async (req, res, next) => {
  //only bookings that aren't over in the future//

  const bookingsQuery = await pool.query("SELECT * FROM bookings");

  let bookings = bookingsQuery.rows;
  console.log(bookingsQuery.rows);

  if (bookingsQuery.rowCount > 0) {
    for (let booking of bookings) {
      booking.lawyer_name = await getUserName(booking.lawyer_id);
      booking.client_name = await getUserName(booking.client_id);
    }
  }

  res.status(StatusCodes.OK).json({ bookings });
};

exports.getLawyerBookings = async (req, res, next) => {
  const { lawyerId } = req.params;

  const bookingsQuery = await pool.query(
    "SELECT * FROM bookings WHERE bookings.lawyer_id = $1",
    [lawyerId]
  );

  let bookings = bookingsQuery.rows;
  for (let booking of bookings) {
    const clientQuery = await pool.query(
      "SELECT profiles .*, users.email FROM profiles LEFT JOIN users on users.id = profiles.user_id WHERE user_id = $1",
      [booking.client_id]
    );
    booking.client = clientQuery.rows[0];
  }

  res.status(StatusCodes.OK).send(bookings);
};
