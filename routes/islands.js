var express = require('express');
var router = express.Router();
const authUtil = require('../module/authUtil');
const islandsController = require('../controllers/islandController');

router.get('/', authUtil.checkToken, islandsController.getIslands);

module.exports = router;
