var express = require('express');
var router = express.Router();
const forumController = require('../controllers/forum/forum');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;

router.get('/',  isLoggedIn, forumController.index);
// router.post('/postMessage',  isLoggedIn, forumController.postMessage);

module.exports = router;



