const client = require('../../config/postgresql');

module.exports = function deleteNotification(id) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'DELETE FROM reports WHERE id=($1)',
            values: [id],
        }
        client.query(query, (err, res) => {
            if (err) {
                console.log(err.stack)
                reject(err)
            } else {
                resolve(id);
            }
        })
    })
}