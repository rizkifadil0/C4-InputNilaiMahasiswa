// TODO: Buat koneksi pool MySQL disini menggunakan Environment Variable (process.env)
require("dotenv").config();
const mysql = require("mysql2");

// Konfigurasi koneksi database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nilai_mahasiswa",
  port: process.env.DB_PORT || 3306,
});

// Test koneksi
connection.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to database:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL database successfully!");
});

module.exports = connection;
