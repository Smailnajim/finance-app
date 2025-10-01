const express = require('express');
const router = express.Router();



const userC = require('./../controllers/userController');


router.get("/login", function (req, res) {
    return userC.renderLogin(req, res);
});
router.post("/login", function (req, res) {
    return userC.login(req, res);
});

router.get("/register", function (req, res) {
    return userC.register(req, res);
});
router.post("/register", function (req, res) {
    const user = userC.create(req, res);
    console.log(user);
});

router.get("/logout", function (req, res) {
    userC.logout(req, res);
});

router.get("/home", function (req, res) {
    userC.renderHome(req, res);
});

router.get("/home", function (req, res) {
    userC.renderHome(req, res);
});

module.exports = router;