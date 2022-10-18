const bcrypt = require("bcrypt");
const pool = require("../utils/db");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { validateLogin } = require("../utils/validation");

exports.login = async (req, res, next) => {
  try {
    const loginDetails = await validateLogin.validateAsync(req.body, {
      abortEarly: false,
    });

    const check = await pool.query(
      "SELECT users .*, user_types.name, profiles.first_name, profiles.last_name, profiles.image_url FROM users " +
        "LEFT JOIN user_types ON users.user_type_id = user_types.id " +
        "LEFT JOIN profiles ON users.id = profiles.user_id " +
        "WHERE email = $1",
      [loginDetails.email]
    );

    if (check.rowCount < 1) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json([{ message: "Invalid username or password" }]);
    }

    const isValidPassword = await bcrypt.compare(
      loginDetails.password,
      check.rows[0]["password"]
    );

    if (!isValidPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json([{ message: "Invalid username or password" }]);
    }

    const {
      id,
      email,
      first_name: firstName,
      last_name: lastName,
      name: userType,
      image_url: imageUrl,
    } = check.rows[0];

    const token = await jwt.sign({ id, userType }, process.env.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.status(StatusCodes.OK).json({
      msg: "Login success",
      name: `${firstName} ${lastName}`,
      userType,
      email,
      imageUrl,
      token,
    });
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
