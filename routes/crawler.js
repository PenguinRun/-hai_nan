var express = require('express');
var router = express.Router();

const CrawlerModifyMethod = require('../controllers/crawler/modify_controller');

crawlerModifyMethod = new CrawlerModifyMethod();

router.get('/crawler', crawlerModifyMethod.getBeachData);

module.exports = router;
