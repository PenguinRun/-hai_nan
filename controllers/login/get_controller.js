const loginAction = require('../../models/login/login_model');
const config = require('../../config/development_config');

module.exports = class GetLogin {
    // 登入後進行註冊資料
    register(req, res, next) {
        const signData = {
            id: req.user.id,
            displayName: req.user.displayName,
            email: req.user.emails,
        }

        req.session.fbID = req.user.id;

        loginAction(signData).then(result => {
            res.redirect('https://' + config.frontEndHost + '/#!index');
        }, err =>{
            res.redirect('https://' + config.frontEndHost + '/#!index');
        })
    }
}