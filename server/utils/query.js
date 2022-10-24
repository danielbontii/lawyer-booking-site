const pool = require("./db");

const fetchAdmins = async () => {
  const adminIdQuery = await pool.query(
    "SELECT id FROM user_types WHERE name = 'admin'"
  );
  const admins = await pool.query(
    "SELECT * from users WHERE user_type_id = $1",
    [adminIdQuery.rows[0]["id"]]
  );

  if (admins.rowCount > 0) {
    return admins.rows;
  }

  return null;
};

const findUserById = async (userId) => {
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

  if (user.rowCount > 0) {
    return user.rows;
  }

  return null;
};

const fetchLawyerUserTypeId = async () => {
  const lawyerUserTypeIdQuery = await pool.query(
    "SELECT id FROM user_types WHERE name = 'lawyer'"
  );
  if (lawyerUserTypeIdQuery.rowCount > 0) {
    return lawyerUserTypeIdQuery.rows[0]["id"];
  }
  return null;
};

const fetchClientUserTypeId = async () => {
  const clientUserTypeIdQuery = await pool.query(
    "SELECT id FROM user_types WHERE name = 'client'"
  );

  if (clientUserTypeIdQuery.rowCount > 0) {
    return clientUserTypeIdQuery.rows[0]["id"];
  }
  return null;
};

module.exports = {
  fetchAdmins,
  findUserById,
  fetchLawyerUserTypeId,
  fetchClientUserTypeId,
};
