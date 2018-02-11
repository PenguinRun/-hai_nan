// 若引入密碼登入，可使用。
const crypto = require('crypto');

module.exports = function getRePassword(password) {
    //加密
    let hashPassword = crypto.createHash('sha1');
    hashPassword.update(password);
    const rePassword = hashPassword.digest('hex');
    //   console.log('rePassword: ' + rePassword);
    return rePassword;
}