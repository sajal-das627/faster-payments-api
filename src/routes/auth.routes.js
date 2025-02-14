// src/routes/auth.routes.js (Auth Routes)
const express = require("express");
const { generateToken } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/token", generateToken);

module.exports = router;
