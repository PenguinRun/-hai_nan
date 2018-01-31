const client = require('../../config/postgresql');
const onTime = require('../../service/on_time');
const uuid = require('uuid/v4');

module.exports = function createNotification(data) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'INSERT INTO events(id, target_id, description, title, contact, date_time, place, ref_url, created_by, modified_by, created, modified) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
            values: [uuid(), data.targetID, data.description, data.title, data.contact, data.dateTime, data.place, data.refURL, data.createdBy, data.modifyBy, onTime(), onTime()],
        }
        client.query(query, (err, res) => {
            let result = {};
            if (err) {
                console.log(err.stack);
                result.status = "建立淨灘活動失敗！";
                result.err = "伺服器錯誤。";
                reject(result);
            } else {
                result.status = "建立淨灘活動成功！";
                result.data = data;
                resolve(result);
            }
        })
    })
}