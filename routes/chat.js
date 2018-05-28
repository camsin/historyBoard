const express = require('express');
const router = express.Router();
const chatController = require('./../controllers/chat/chat');
const isLoggedIn = require('./../auth/passport.js').isLoggedIn;

router.get('/', isLoggedIn, chatController.chat);

router.get('/m', isLoggedIn, chatController.getMessages);

module.exports = router;
