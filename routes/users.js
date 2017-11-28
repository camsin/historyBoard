var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users/users');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;


/* GET home page. */
router.get('/myProfile', isLoggedIn, usersController.myProfile);

router.get('/getMyProfile', isLoggedIn, usersController.getMyProfile);

router.post('/updateMyProfile', isLoggedIn, usersController.updateMyProfile);

router.get('/getUserById/:id', isLoggedIn, usersController.getUserById);

module.exports = router;
