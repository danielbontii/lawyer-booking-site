const multer = require("multer");
const path = require("path");
const pool = require("../utils/db");
const { StatusCodes } = require("http-status-codes");
const { validateProfileUpdate } = require("../utils/validation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images/profiles/"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

exports.upload = multer({ storage: storage });

exports.updateProfilePhoto = async (req, res, next) => {
  const { userId } = req.params;
  const imgUrl = req.file.path;
  const update = await pool.query(
    "UPDATE profiles SET image_url = $1 WHERE user_id = $2",
    [imgUrl, userId]
  );

  if (update.rowCount > 0) {
    res.status(StatusCodes.OK).json("profile photo updated successfully");
  }
};

const updateProfileField = async (field, value, userId) => {
  const update = await pool.query(
    `UPDATE profiles SET ${field} = $1 WHERE user_id = $2`,
    [value, userId]
  );
  console.log("rowcount " + update.rowCount);
};

exports.updateProfile = async (req, res, next) => {
  const fieldsToUpdate = await validateProfileUpdate.validateAsync(req.body, {
    abortEarly: false,
  });

  const { userId } = req.params

  const { firstName, lastName, otherNames, summary, phoneNumber, dailyCharge, dob } =
    fieldsToUpdate;

  if (firstName) {
    await updateProfileField("first_name", firstName, userId);
  }

  if (lastName) {
    await updateProfileField("last_name", lastName, userId);
  }

  if (otherNames) {
    await updateProfileField("other_names", otherNames, userId);
  }

  if (summary) {
    await updateProfileField("summary", summary, userId);
  }

  if (phoneNumber) {
    await updateProfileField("phone_number", phoneNumber, userId);
  }

  if (dailyCharge) {
    await updateProfileField("daily_charge", dailyCharge, userId);
  }

  if (dob) {
    await updateProfileField("dob", dob, userId);
  }

  res.status(StatusCodes.OK).json("Profile updated successfully");
};
