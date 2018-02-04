const getAllData = require('../../models/notification/get_model');


module.exports = class GetNotification {
    // 提取淨灘通報
    getNotificationData(req, res, next) {
        getAllData().then(result => {
            res.json({
                result: result
            })
        }, err => {
            res.json({
                result: err
            })
        })
    }
}
