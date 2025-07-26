const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

// Routes
const router = require("./router/auth-router");
app.use("/", router);

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});
