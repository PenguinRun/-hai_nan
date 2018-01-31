const client = require('../../config/postgresql');

module.exports = function getNotification(id) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT * from events'
        }
        client.query(query, async (err, res) => {
            if (err) {
                console.log(err.stack)
                reject(err)
            } else {
                let result = [];
                for (let key in res.rows) {
                    let data = {};
                    data.targetID = res.rows[key].target_id;
                    let targetName = await getTargetName(res.rows[key].target_id);
                    data.targetName = targetName.title;
                    data.title = res.rows[key].title;
                    data.description = res.rows[key].description;
                    data.contact = res.rows[key].contact;
                    data.dateTime = res.rows[key].date_time;
                    data.place = res.rows[key].place;
                    data.refURL = res.rows[key].ref_url;
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