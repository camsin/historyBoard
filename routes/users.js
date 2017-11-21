var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users/users');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;


/* GET home page. */
router.get('/myProfile', isLoggedIn, usersController.myProfile);

router.get('/getMyProfile', isLoggedIn, usersController.getMyProfile);

module.exports = router;
