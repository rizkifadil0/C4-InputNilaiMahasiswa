// TODO: Ini adalah titik masuk aplikasi, setup Express, Middleware, dan Server Listener disini
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Routes
app.use("/", routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).send("404 - Halaman tidak ditemukan");
});

// Start Server
app.listen(PORT, () => {
  console.log("===========================================");
  console.log("🚀 Server is running!");
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log("===========================================");
});
