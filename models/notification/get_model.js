const client = require('../../config/postgresql');

module.exports = function getNotification(id) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT * from reports'
        }
        client.query(query, async (err, res) => {
            if (err) {
                console.log(err.stack)
                reject(err)
            } else {
                let result = [];
                for (let key in res.rows) {
                    let data = {};
                    data.id = res.rows[key].id;
                    data.targetID = res.rows[key].target_id;
                    let targetName = await getTargetName(res.rows[key].target_id);
                    data.targetName = targetName.title;
                    data.description = res.rows[key].description;
                    data.imageURL = res.rows[key].image_url;
                    data.beachClear = res.rows[key].is_open;
                    data.auther = res.rows[key].created_by;
                    data.editor = res.rows[key].modified_by;
                    data.createDate = res.rows[key].created;
                    data.updateDate = res.rows[key].modified;
                    result.push(data);
                }
                resolve(result);
            }
        })
    })
}

function getTargetName(targetID) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT title FROM targets WHERE id =$1',
            values: [targetID]
        }
        client.query(query, (err, res) => {
            if (err) {
                console.log(err.stack);
                reject(err)
            } else {
                resolve(res.rows[0]);
            }
        })
    })
}