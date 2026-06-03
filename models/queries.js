const pool = require("./pool");

async function dbTest() {
  const { rows } = await pool.query("SELECT * FROM users");

  return rows;
}

module.exports = {
  dbTest,
};
