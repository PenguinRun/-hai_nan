var express = require('express');
var router = express.Router();

const GetActivity = require('../controllers/activity/get_controller');
const ModifyActivity = require('../controllers/activity/modify_controller');

getActivity = new GetActivity();
modifyActivity = new ModifyActivity();

// 提取淨灘活動
router.get('/activity', getActivity.getActivityData);
// 建立淨灘活動
router.post('/activity', modifyActivity.postActivityData);
// 更改淨灘活動
router.put('/activity', modifyActivity.putActivityData);
// 刪除淨灘活動
router.delete('/activity', modifyActivity.deleteActivityData);

module.exports = router;
