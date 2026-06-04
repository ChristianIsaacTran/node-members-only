const pool = require("./pool");
const bcrypt = require("bcryptjs");

// adds a new user to the database from given validData
async function addUser(validData) {
  try {
    const addUserQuery = `
  INSERT INTO users(username, first_name, last_name, password, membership_status, admin_status)
  VALUES
  ($1,
  $2,
  $3,
  $4,
  $5,
  $6);
  `;

    const username = validData.username;
    const firstName = validData.firstName;
    const lastName = validData.lastName;
    const password = await bcrypt.hash(validData.password, 10);

    // by default, membership and admin status are default upon new signup
    const membershipStatus = false;
    const adminStatus = false;

    await pool.query(addUserQuery, [
      username,
      firstName,
      lastName,
      password,
      membershipStatus,
      adminStatus,
    ]);

    console.log("Added user to db successfully.");
  } catch (error) {
    console.log("Error: User not added to db through signup.")
    throw new Error(error);
  }
}

module.exports = {
  addUser,
};
