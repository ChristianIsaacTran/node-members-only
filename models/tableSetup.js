const { Client } = require("pg");
const bcrypt = require("bcryptjs");

const usersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR,
        membership_status BOOL,
        admin_status BOOL
    );
`;

const messagesTableQuery = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        username VARCHAR(255),
        password VARCHAR,
        membership_status BOOL,
        admin_status BOOL
    );`;

const memberPassTableQuery = `
    CREATE TABLE IF NOT EXISTS member_pass (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        password VARCHAR
    );
`;

const memberPassInsertQuery = `
INSERT INTO member_pass(password)
    VALUES
    ($1);
`;

const adminPassTableQuery = `
    CREATE TABLE IF NOT EXISTS admin_pass (
        id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        password VARCHAR
    );
`;

const adminPassInsertQuery = `
INSERT INTO admin_pass(password)
    VALUES
    ($1);
    `;

async function checkMemberPassExist() {
  const client = new Client({ connectionString: process.env.DB_CON_STRING });

  await client.connect();

  const { rows } = await client.query("SELECT * FROM member_pass");

  if (rows.length === 0) {
    // make member pass and hash it, then pass it to insert query
    const memberPass = "1234";
    
    const hashedMemberPass = await bcrypt.hash(memberPass, 10);

    await client.query(memberPassInsertQuery, [hashedMemberPass]);
    
    console.log("Member password missing. Seeding table...");
}

  await client.end();
  
  console.log("Member pass check done.");
}

async function checkAdminPassExist() {
  const client = new Client({ connectionString: process.env.DB_CON_STRING });

  await client.connect();

  const { rows } = await client.query("SELECT * FROM admin_pass");

  if (rows.length === 0) {
    // make admin pass and hash it, then pass it to insert query
    const adminPass = "1010";

    const hashedAdminPass = await bcrypt.hash(adminPass, 10);

    await client.query(adminPassInsertQuery, [hashedAdminPass]);

    console.log("Admin password missing. Seeding table...");
  }

  await client.end();

  console.log("Admin pass check done.");
}

async function main() {
  const client = new Client({ connectionString: process.env.DB_CON_STRING });

  // connect to database
  await client.connect();

  // create all tables
  console.log("Creating tables if they don't exist...");
  await client.query(usersTableQuery);
  await client.query(messagesTableQuery);
  await client.query(memberPassTableQuery);
  await client.query(adminPassTableQuery);

  // populate member pass and admin pass if they do not exist
  await checkMemberPassExist();
 await checkAdminPassExist();

  // end db connection after queries
  await client.end();

  console.log("Table setup done.");
}

main();
