var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users/users');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
let type = upload.any();


/* GET home page. */
router.get('/myProfile', isLoggedIn, usersController.myProfile);

router.get('/getMyProfile', isLoggedIn, usersController.getMyProfile);

router.post('/updateMyProfile', isLoggedIn, type, usersController.updateMyProfile);

router.get('/getUserById/:id', isLoggedIn, usersController.getUserById);

module.exports = router;
