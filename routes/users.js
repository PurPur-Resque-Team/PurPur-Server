var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authUtil = require('../module/authUtil');


router.post('/signup', userController.signup);
router.put('/setUserName', authUtil.checkToken, userController.setUserName);

module.exports = router;
