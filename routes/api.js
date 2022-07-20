const router = require("express").Router();
const authRoute = require('./auth/auth');

router.use("/register/", authRoute);

router.use("/kkkk/", authRoute);

module.exports = router;