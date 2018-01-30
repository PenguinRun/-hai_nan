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
                let result = {};
                result.id = res.rows[0].id;
                result.targetID = res.rows[0].target_id;
                let targetName = await getTargetName(res.rows[0].target_id);
                result.targetName = targetName.title;
                result.description = res.rows[0].description;
                result.imageURL = res.rows[0].image_url;
                result.beachClear = res.rows[0].is_open;
                result.auther = res.rows[0].created_by;
                result.editor = res.rows[0].modified_by;
                result.createDate = res.rows[0].created;
                result.updateDate = res.rows[0].modified;

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