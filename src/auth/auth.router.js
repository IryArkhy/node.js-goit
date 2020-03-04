const express = require("express");
const router = express.Router();
const register = require("./auth.signUp");
const login = require("./auth.signIn");
const logout = require("./auth.logout");
const current = require("./auth.getCurrent");

const checkToken = require("../middleware/checkToken");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkToken, logout)
router.get("/current", checkToken, current);

module.exports = router;