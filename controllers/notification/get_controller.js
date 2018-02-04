const getAllData = require('../../models/notification/get_model');


module.exports = class GetNotification {
    // 提取淨灘通報
    getNotificationData(req, res, next) {
      req.session.data = 'hello world';
      req.session.save(function(err) {
        var s = res.app.get('sessionStore');
        res.app.get('sessionStore').get(req.session.id, function(e, c) {
          console.log(e);
          console.log(c);
        })
      })

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
