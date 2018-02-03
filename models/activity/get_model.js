const client = require('../../config/postgresql');

module.exports = function getNotification(id) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT events.*, targets.title AS target_title, targets.city, targets.geojson FROM events INNER JOIN targets ON events.target_id = targets.id'
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
                    data.city = res.rows[key].city;
                    data.beachName = res.rows[key].target_title.substring(0, res.rows[key].target_title.indexOf("-"));
                    data.beachTitle = res.rows[key].target_title;
                    data.description = res.rows[key].description;
                    data.title = res.rows[key].title;
                    let geojson = JSON.parse(res.rows[key].geojson);
                    data.geojson = geojson.coordinates;
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