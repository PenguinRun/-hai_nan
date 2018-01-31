const client = require('../../config/postgresql');

const onTime = require('../../service/on_time');

module.exports = function updateNotification(data) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'UPDATE events SET target_id=($1),title=($2), description=($3), contact=($4), date_time=($5), place=($6),ref_url=($7), modified_by=($8), modified=($9) WHERE id=($10)',
            values: [data.targetID, data.title, data.description, data.contact, data.dateTime, data.place, data.refURL, data.modifyBy, onTime(), data.id],
        }
        client.query(query, (err, res) => {
            let result = {};
            if (err) {
                console.log(err.stack);
                result.status = "活動資料修改失敗。";
                result.err = "伺服器錯誤。";
                reject(err);
            } else {
                result.status = "活動資料修改成功。";
                result.data = data;
                resolve(result);
            }
        })
    })
}