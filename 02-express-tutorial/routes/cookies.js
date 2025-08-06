/*
    Get: read data
    Post: insert data
    Put: update data
    Delete: delete data
*/
const express = require("express");
const router = express.Router();
const { auth, login, logout, testing } = require("../controllers/cookies.js");

router.route("/login").post(login);
router.route("/logout").delete(logout);
router.route("/test").get(auth,testing);

module.exports = router;