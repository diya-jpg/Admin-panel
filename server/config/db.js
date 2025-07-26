// config/db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "react"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err.stack);
    return;
  }
  console.log("✅ Connected to MySQL");
});

module.exports = db;
