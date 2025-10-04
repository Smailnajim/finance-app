const express = require('express');
const router = express.Router();


const isAuth = require('./../middleware/isAuth');
const userController = require('./../controllers/userController');
const transactionController = require('./../controllers/transactionController');
const categoryController = require('./../controllers/categoryController');

router.get("/login", function (req, res) {
    return userController.renderLogin(req, res);
});
router.post("/login", function (req, res) {
    return userController.login(req, res);
});

router.get("/register", function (req, res) {
    return userController.register(req, res);
});
router.post("/register", function (req, res) {
    const user = userController.create(req, res);
    console.log(user);
});

router.get("/logout", function (req, res) {
    userController.logout(req, res);
});

router.get("/home", function (req, res) {
    userController.renderHome(req, res);
});

router.get("/transaction", /*isAuth,*/ function (req, res) {
    transactionController.renderTransaction(req, res);
});

router.get('/create-category', function(req, res){
    categoryController.create(req, res);
});

module.exports = router;