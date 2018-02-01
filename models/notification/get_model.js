const client = require('../../config/postgresql');

module.exports = function getNotification(id) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT reports.*, targets.title, targets.city, targets.geojson FROM reports INNER JOIN targets ON reports.target_id = targets.id;'
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
                    data.beachName = res.rows[key].title.substring(0, res.rows[key].title.indexOf("-"));
                    data.title = res.rows[key].title;
                    data.description = res.rows[key].description;
                    let geojson = JSON.parse(res.rows[key].geojson);
                    data.geojson = geojson.coordinates;
                    data.imageURL = res.rows[key].image_url;
                    data.beachClean = res.rows[key].is_open;
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