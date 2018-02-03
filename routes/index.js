var express = require('express');
var router = express.Router();

const config = require('../config/development_config');

/* GET home page. */
router.get('/', function (req, res, next) {
  let fbID = req.session.fbID;
  // res.render('index', { title: 'Express', fbID: fbID });
  res.json({ result: fbID })
});

router.get('/test', function(req, res, next) {
  // console.log("https://" + config.backEndHost + "/api/beach/login/facebook/callback")
  res.render('index', { title: 'Express'})
});

module.exports = router;
