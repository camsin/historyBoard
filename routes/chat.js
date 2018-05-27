const express = require('express');
let router = express.Router();
const chatController = require('./../controllers/chat/chat');

router.get('/',chatController.chat);

router.get('/m', chatController.getMessages);

module.exports = router;
