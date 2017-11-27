var express = require('express');
var router = express.Router();
const notificationsController = require('../controllers/notifications/notifications');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;


/* GET users listing. */
router.get('/',  isLoggedIn, notificationsController.index);

router.get('/getLimit',  isLoggedIn, notificationsController.getNotificationsLimit);

router.get('/get',  isLoggedIn, notificationsController.getAllNotifications);

router.post('/update',  isLoggedIn, notificationsController.updateNotification);

router.post('/add',  isLoggedIn, notificationsController.create);

module.exports = router;
