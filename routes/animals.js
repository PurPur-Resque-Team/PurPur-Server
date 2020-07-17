var express = require('express');
var router = express.Router();
const authUtil = require('../module/authUtil');
const animalController = require('../controllers/animalController');

router.get('/', animalController.getAnimalInfo);
router.post('/', animalController.clearMission);

module.exports = router;
