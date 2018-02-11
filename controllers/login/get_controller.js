const registerAction = require('../../models/login/login_model');
const config = require('../../config/development_config');

module.exports = class GetLogin {
    // 登入後進行註冊資料
    register(req, res, next) {
        // console.log(req.user);
        const signData = {
            id: req.user.id,
            displayName: req.user.displayName,
            email: req.user.emails[0].value,
        }

        let fbID = req.user.id;

        registerAction(signData).then(result => {
            // res.redirect('https://' + config.frontEndHost + '/#!index/'+ "?id=" + fbID);
            res.redirect('http://localhost:3000/test/?id=' + fbID);
        })
    }
    // 取得token
    getToken(req, res, next) {
        // const id = req // id來源。
        const token = jwt.sign({
            algorithm: 'HS256',
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
            data: rows[0].id
        }, config.secretKey);
        res.setHeader('token', token);
        res.json({
            result: {
                status: "登入成功。",
                loginMember: "歡迎 " + rows[0].name + " 的登入！",
                // token: token
            }
        })

    }
}