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
    console.log("Error: User not added to db through signup.");
    throw new Error(error);
  }
}

// find user with username, returns the user. This is assuming that each user cannot have the same username (case sensitive)
async function findUserThroughUsername(usernameSearch) {
  try {
    const findUserQuery = `
  SELECT * FROM users
  WHERE username = ($1);
  `;

    const { rows } = await pool.query(findUserQuery, [usernameSearch]);

    if (rows.length === 0) {
      console.log("Error: no user found through username.");
      return false;
    }

    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

// find user with ID, returns the user.
async function findUserThroughID(idSearch) {
  try {
    const findUserQuery = `
  SELECT * FROM users
  WHERE id = ($1);
  `;

    const { rows } = await pool.query(findUserQuery, [idSearch]);

    if (rows.length === 0) {
      console.log("Error: no user found through id.");
      return false;
    }

    return rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

// gets the membership hashed password
async function getMemberPass() {
  try {
    const memberPassQuery = `
  SELECT password FROM member_pass;
  `;

    const { rows } = await pool.query(memberPassQuery);

    if(rows.length === 0) {
      throw new Error("Error: membership password not found in DB.");
    }

    return rows[0].password;

  } catch (error) {
    throw new Error(error);
  }
}

// changes membership status to true for the current user
async function makeUserMember(username) {
  try {
    const updateMemberQuery = `
    UPDATE users
    SET membership_status = true
    WHERE username = ($1);
    `;

    await pool.query(updateMemberQuery, [username]);

    console.log("Updated membership status to true.");

  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  addUser,
  findUserThroughUsername,
  findUserThroughID,
  getMemberPass,
  makeUserMember,
};
