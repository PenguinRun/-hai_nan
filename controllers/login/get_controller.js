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

        console.log(session.store);

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

        // req.session.data = 'hello world';


        const test = req.body.id;
        const token = req.headers["x-access-token"];
        const fbID = req.session.fbID;

        res.app.get('sessionMemory').get(token, function (e, c) {
            console.log("err: " + e);
            console.log("data: " + c);
        })


        console.log("test id: " + test);
        console.log("token: " + token);

        console.log("fbID: " + fbID);

        console.log(req.headers);


        // let test = sessionStore.get((sid, result) => {
        //     return result;
        // })

        // console.log(test);

        console.log(req.session);

        res.json({
            result: {
                token: token,
                fbID: fbID
            }
        })
    }
}