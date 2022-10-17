const multer = require("multer");
const path = require("path");
const pool = require("../utils/db");
const { StatusCodes } = require("http-status-codes");

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
