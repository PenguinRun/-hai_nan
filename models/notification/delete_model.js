const client = require('../../config/postgresql');

module.exports = function deleteNotification(id) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'DELETE FROM reports WHERE id=($1)',
            values: [id],
        }
        client.query(query, (err, res) => {
            let result = {};
            if (err) {
                console.log(err.stack);
                result.status = "刪除通報資料失敗！";
                result.err = "伺服器錯誤。";
                reject(result);
            } else {
                result.status = "刪除活動資料成功！";
                result.data = id;
                resolve(result);
            }
        })
    })
}