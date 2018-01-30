const request = require('request');
const uuid = require('uuid/v4');
const client = require('../../config/postgresql');
const onTime = require('../../service/on_time');

module.exports = function crawlerBeach(url) {
    return new Promise(async (resolve, reject) => {
        crawlerBeachAction = new CrawlerBeachAction();

        // 取得全部海岸資料
        const result = await crawlerBeachAction.getAllCity(url);

        // 將資料存進資料庫
        for (let i = 0; i < result.length; i += 1) {
            await insetToDatabase(result[i]);
        }
        resolve("抓取海灘資料成功。");
    })
}

class CrawlerBeachAction {
    // 取得全部的城市
    getAllCity(url) {
        return new Promise((resolve, reject) => {
            request.get({
                url: url,
            }, function (err, res, body) {

                const data = JSON.parse(body);
                let result = [];

                for (let i = 0; i < data.features.length; i += 1) {
                    let beachData = {};
                    beachData.sid = data.features[i].properties.sid;
                    beachData.title = data.features[i].properties.sealinename + "-" + data.features[i].properties.subid;
                    beachData.city = data.features[i].properties.cityname;
                    beachData.geojson = data.features[i].geometry;
                    beachData.refURL = "https://ecolife2.epa.gov.tw/coastal/SeaResult.aspx?slid=" + data.features[i].properties.slid;
                    result.push(beachData);
                }
                // sid 排序
                result = result.sort(function (a, b) {
                    return a.sid > b.sid ? 1 : -1;
                });
                resolve(result);
            })
        })
    }
}

function insetToDatabase(data) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'INSERT INTO targets(id, title, description, geojson, ref_url, is_open, created_by, created, modified_by, modified, city) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            values: [uuid(), data.title, "", data.geojson, data.refURL, false, "fd6e1fc0-e116-44c8-8bda-5de78e48568b", onTime(), "fd6e1fc0-e116-44c8-8bda-5de78e48568b", onTime(), data.city],
        }
        client.query(query, (err, res) => {
            if (err) {
                console.log(err.stack)
                reject(err)
            } else {
                resolve("res")
            }
        })
    })
}
