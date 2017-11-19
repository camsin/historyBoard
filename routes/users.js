var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users/users');


/* GET home page. */
router.get('/myProfile', usersController.myProfile);

module.exports = router;
