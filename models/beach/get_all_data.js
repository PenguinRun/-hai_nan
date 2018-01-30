const client = require('../../config/postgresql');

module.exports = function getAllData() {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT * from targets'
        }
        client.query(query, async (err, res) => {
            if (err) {
                console.log(err.stack)
                reject(err)
            } else {
                const data = res.rows;
                let resultArray = [];
                for (let i = 0; i < data.length; i += 1) {
                    let beachData = {};
                    beachData.id = data[i].id;
                    beachData.city = data[i].city;
                    beachData.beachName = data[i].title.substring(0, data[i].title.indexOf("-"));
                    beachData.title = data[i].title;
                    beachData.description = data[i].description;
                    let geojson = JSON.parse(data[i].geojson);
                    beachData.geojson = geojson.coordinates;
                    beachData.refURL = data[i].ref_url;
                    beachData.beachClean = data[i].is_open;
                    beachData.auther = data[i].created_by;
                    beachData.createDate = data[i].created;
                    beachData.editor = data[i].modified_by;
                    beachData.updateDate = data[i].modified;
                    resultArray.push(beachData);
                }
                resolve(resultArray);
            }
        })
    })
}