const client = require('../../config/postgresql');
const onTime = require('../../service/on_time');
const uuid = require('uuid/v4');

module.exports = function registerAction(data) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'INSERT INTO member(id, fb_id, email, created, modified) VALUES($1, $2, $3, $4, $5)',
            values: [uuid(), data.id, data.email, onTime(), onTime()],
        }
        client.query(query, (err, res) => {
            let result = {};
            if (err) {
                console.log(err.stack);
                result.status = "登入淨灘系統失敗！";
                result.err = "伺服器錯誤。";
                reject(err);
            } else {
                result.status = "登入淨灘系統成功！";
                result.data = data;
                resolve(result);
            }
        })
    })
}