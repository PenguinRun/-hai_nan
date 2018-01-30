const client = require('../../config/postgresql');
const onTime = require('../../service/on_time');
const uuid = require('uuid/v4');

module.exports = function createNotification(data) {
    return new Promise((resolve, reject) => {
        // console.log(data);
        const query = {
            text: 'INSERT INTO reports(id, target_id, description, image_url, is_open, created_by, modified_by, created, modified) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            values: [uuid(), data.targetID, data.description, data.imageURL, data.isOpen, data.createdBy, data.modifyBy, onTime(), onTime()],
            // values: [uuid(), "fd6e1fc0-e116-44c8-8bda-5de78e48568b", data.description, data.imageURL, data.isOpen, "fd6e1fc0-e116-44c8-8bda-5de78e48568b", "fd6e1fc0-e116-44c8-8bda-5de78e48568b", onTime(), onTime()],
        }
        client.query(query, (err, res) => {
            if (err) {
                console.log(err.stack)
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}