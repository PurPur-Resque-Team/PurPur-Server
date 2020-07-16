var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/users', require("./users"));
router.use('/islands', require('./islands'));
router.use('/animals', require('./animals'));

module.exports = router;
