var express = require('express');
var router = express.Router();
const notificationsController = require('../controllers/notifications/notifications');

/* GET users listing. */
router.get('/', notificationsController.index);

module.exports = router;
