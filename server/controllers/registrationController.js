const pool = require("../utils/db");
const { StatusCodes } = require("http-status-codes");

const { validateRegistration } = require("../utils/validation");

exports.register = async (req, res, next) => {
  try {
    const registrationDetails = await validateRegistration.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );
    console.log(registrationDetails);
    const isExistentEmail = pool.query(
      "SELECT email FROM users WHERE email = $1",
      [registrationDetails.email]
    );

    if (isExistentEmail.rowCount > 0) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ msg: `${registrationDetails.email} is already registered` });
    }
    res.json(registrationDetails);
  } catch (err) {
    console.log(err.message);
    if (err.isJoi === true) {
      return res.status(StatusCodes.BAD_REQUEST).json(err.details);
    }
  }
};
