var express = require('express');
var router = express.Router();

const GetNotification = require('../controllers/notification/get_controller');
const ModifyNotification = require('../controllers/notification/modify_controller');

getNotification = new GetNotification();
modifyNotification = new ModifyNotification();

// 提取淨灘通報
router.get('/notification', getNotification.getNotificationData);
// 建立淨灘通報
router.post('/notification', modifyNotification.postNotificationData);
// 更改建立通報
router.put('/notification', modifyNotification.putNotificationData);
// 刪除淨灘通報
router.delete('/notification', modifyNotification.deleteNotificationData);


module.exports = router;
