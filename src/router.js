const router = require("express").Router();
const athRouter = require("../src/auth/auth.router");

router.use("/auth", athRouter);

module.exports = router;