var express = require('express');
var router = express.Router();
const notificationsController = require('../controllers/notifications/notifications');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;


/* GET users listing. */
router.get('/',  isLoggedIn, notificationsController.index);

module.exports = router;
