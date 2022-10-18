const pool = require("../utils/db");
const bcrypt = require("bcrypt");

const { StatusCodes } = require("http-status-codes");
const { validateRegistration } = require("../utils/validation");

exports.lawyerUserTypeId = async (req, res, next) => {
  const userTypeId = await pool.query(
    "SELECT id FROM user_types WHERE name = 'lawyer'"
  );
  return res.status(StatusCodes.OK).json(userTypeId.rows[0]["id"]);
};

exports.clientUserTypeId = async (req, res, next) => {
  const userTypeId = await pool.query(
    "SELECT id FROM user_types WHERE name = 'client'"
  );
  return res.status(StatusCodes.OK).json(userTypeId.rows[0]["id"]);
};

exports.userTypes = async (req, res, next) => {
  const userTypes = await pool.query(
    "SELECT * FROM user_types WHERE name <> 'admin'"
  );
  return res.status(StatusCodes.OK).json(userTypes.rows);
};

exports.register = async (req, res, next) => {
  console.log(req.body);
  try {
    const registrationDetails = await validateRegistration.validateAsync(
      req.body,
      {
        abortEarly: false,
      }
    );
    const {
      email,
      password,
      firstName,
      otherNames,
      lastName,
      dob,
      phoneNumber,
      userType,
    } = registrationDetails;

    const isExistentEmail = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );

    if (isExistentEmail.rowCount > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ msg: `${registrationDetails.email} is already registered` });
    }

    const userTypeQuery = await pool.query(
      "SELECT id, name FROM user_types WHERE name =$1",
      [userType]
    );

    const { id, name } = userTypeQuery.rows[0];

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (email, password, user_type_id) VALUES($1, $2, $3) RETURNING *",
      [email, hashedPassword, id]
    );

    if (newUser.rowCount > 0) {
      const profile = await pool.query(
        "INSERT INTO profiles (user_id, first_name, other_names, last_name, dob, phone_number) " +
          "VALUES($1, $2, $3, $4, $5, $6)",
        [
          newUser.rows[0]["id"],
          firstName,
          otherNames,
          lastName,
          dob,
          phoneNumber,
        ]
      );

      if (profile.rowCount > 0) {
        res.status(StatusCodes.OK).json({
          id: newUser.rows[0]["id"],
          email: email,
          userType: name,
        });
      }
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
