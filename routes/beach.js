var express = require('express');
var router = express.Router();

const GetBeach = require('../controllers/beach/get_controller');

getBeach = new GetBeach();

// 提取淨灘通報
router.get('', getBeach.getBeachData);

module.exports = router;
