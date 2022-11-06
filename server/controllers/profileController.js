const multer = require("multer");
const path = require("path");
const pool = require("../utils/db");
const { StatusCodes } = require("http-status-codes");
const { validateProfileUpdate } = require("../utils/validation");

const {
  fetchLawyerUserTypeId,
  fetchClientUserTypeId,
} = require("../utils/query");

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
  await pool.query(`UPDATE profiles SET ${field} = $1 WHERE user_id = $2`, [
    value,
    userId,
  ]);
};

exports.updateProfile = async (req, res, next) => {
  const fieldsToUpdate = await validateProfileUpdate.validateAsync(req.body, {
    abortEarly: false,
  });

  const { userId } = req.params;

  const {
    firstName,
    lastName,
    otherNames,
    summary,
    phoneNumber,
    dailyCharge,
    dob,
  } = fieldsToUpdate;

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

exports.getLawyerProfiles = async (req, res, next) => {
  const lawyerUserTypeId = await fetchLawyerUserTypeId();

  const lawyersQuery = await pool.query(
    "SELECT id, email FROM users WHERE user_type_id = $1 AND verified = $2",
    [lawyerUserTypeId, 1]
  );

  let lawyers = lawyersQuery.rows;

  for (let lawyer of lawyers) {
    lawyer.rating = 0;
    lawyer.userType = "lawyer";
    const reviewsQuery = await pool.query(
      "SELECT reviews .*, profiles.image_url as reviewer_photo, CONCAT(profiles.first_name, ' ', profiles.other_names, ' ', profiles.last_name) as reviewer_name " +
        "FROM reviews LEFT JOIN profiles ON profiles.user_id = reviews.user_id WHERE reviews.user_id = $1",
      [lawyer.id]
    );
    lawyer.reviews = reviewsQuery.rows;
    const profileQuery = await pool.query(
      "SELECT * FROM profiles WHERE user_id = $1",
      [lawyer.id]
    );
    lawyer.profile = profileQuery.rows[0];
  }

  res.status(StatusCodes.OK).send(lawyers);
};

exports.getClientProfiles = async (req, res, next) => {
  const clientUserTypeId = await fetchClientUserTypeId();

  const clientsQuery = await pool.query(
    "SELECT id, email FROM users WHERE user_type_id = $1",
    [clientUserTypeId]
  );

  let clients = clientsQuery.rows;

  for (let client of clients) {
    const profileQuery = await pool.query(
      "SELECT * FROM profiles WHERE user_id = $1",
      [client.id]
    );
    client.profile = profileQuery.rows[0];
  }

  return res.status(StatusCodes.OK).json({ clients });
};

exports.getUnverifiedLawyerProfiles = async (req, res, next) => {
  const lawyerUserTypeId = await fetchLawyerUserTypeId();

  const unverifiedUsersQuery = await pool.query(
    "SELECT id, email FROM users WHERE user_type_id = $1 AND verified = $2",
    [lawyerUserTypeId, 0]
  );

  let unverifiedProfiles = unverifiedUsersQuery.rows;

  if (unverifiedProfiles.length > 0) {
    for (let uvp of unverifiedProfiles) {
      const profileQuery = await pool.query(
        "SELECT * FROM profiles WHERE user_id = $1",
        [uvp.id]
      );

      uvp.profile = profileQuery.rows[0];
    }
  }

  res.status(StatusCodes.OK).send(unverifiedProfiles);
};
