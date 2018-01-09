var express = require('express');
var router = express.Router();
const userController = require('../controller/userController.js');


router.post('/register', userController.register)
router.post('/signin', userController.signIn)

module.exports = router;