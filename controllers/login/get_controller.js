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


        res.redirect('https://' + config.frontEndHost + '/#!index');

        // loginAction(signData).then(result => {
        //     res.redirect('https://' + config.frontEndHost + '/#!index');
        // }, err =>{
        //     res.redirect('https://' + config.frontEndHost + '/#!index');
        // })
    }
    // 測試登入
    testLogin(req, res, next) {
        const test = req.body.id;
        const token = req.headers["x-access-token"];
        const fbID = req.session.fbID;
        console.log("test id: " + test);
        console.log("token: " + token);

        console.log("fbID: " + fbID);

        console.log(req.headers);

        res.json({
            result:{
                test: test,
                token: token,
                fbID: fbID
            }
        })        
    }
}