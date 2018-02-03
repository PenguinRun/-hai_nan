// const loginAction = require('../')
const config = require('../../config/development_config');

module.exports = class GetLogin {
    // 登入後進行註冊資料
    register(req, res, next) {
        console.log(req.user);
        console.log(req.sessionID)
        // console.log(req,obj);
        req.session.fbID = req.user.id;
        // res.redirect("http://localhost:3000/test");
        res.redirect("https://" + config.frontEndHost + "/test");
    }
}