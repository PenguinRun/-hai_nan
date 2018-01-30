const request = require('request');
const uuid = require('uuid/v4');
const client = require('../../config/postgresql');
const onTime = require('../../service/on_time');

module.exports = function crawlerBeach(url) {
    return new Promise(async (resolve, reject) => {
        crawlerBeachAction = new CrawlerBeachAction();
        const filterCityResult = [];

        // 取得全部城市資料
        const cityName = await crawlerBeachAction.getAllCity(url);

        let result = [];

        for (let i = 0; i < cityName.length; i += 1) {
            let cityData, beachData;
            // 切割城市資料
            cityData = await crawlerBeachAction.fliterCityData(url, cityName[i]);
            // 切割海灘並重新合併
            beachData = await crawlerBeachAction.filterBeachData(cityData, cityName[i]);
            await result.push(beachData);
        }
        // 拆解一層array
        let merged = [].concat.apply([], result);

        // 將資料存進資料庫
        for (let i = 0; i < merged.length; i += 1) {
            await insetToDatabase(merged[i]);
        }
        resolve("匯入海灘資料成功！");
    })
}

class CrawlerBeachAction {
    // 取得全部的城市
    getAllCity(url) {
        return new Promise((resolve, reject) => {
            request.get({
                url: url,
            }, function (err, res, body) {
                let cityName = [];
                const data = JSON.parse(body);
                for (let i = 0; i < data.features.length; i += 1) {
                    cityName.push(data.features[i].properties.cityname);
                }
                // 去重複
                let allCityName = Array.from(new Set(cityName));

                resolve(allCityName);
            })
        })
    }
    // 切割城市資料
    fliterCityData(url, cityName) {
        return new Promise((resolve, reject) => {
            request.get({
                url: url,
            }, function (err, res, body) {
                let resultArray = [];
                const data = JSON.parse(body);
                for (let i = 0; i < data.features.length; i += 1) {
                    if (data.features[i].properties.cityname === cityName) {
                        let resultObject = {};
                        resultObject.sid = data.features[i].properties.sid;
                        resultObject.city = data.features[i].properties.cityname;
                        resultObject.title = data.features[i].properties.sealinename;
                        resultObject.geojson = data.features[i].geometry;

                        resultArray.push(resultObject);
                    }
                }
                // sid 排序
                resultArray = resultArray.sort(function (a, b) {
                    return a.sid > b.sid ? 1 : -1;
                });
                resolve(resultArray);
            })
        })
    }
    // 切割海灘並合併海灘資料
    filterBeachData(beachData, cityName) {
        return new Promise((resolve, reject) => {
            let sealineName = [];

            let resultArray = [];

            // 取出所有海灘段
            Object.keys(beachData).map(key => {
                sealineName.push(beachData[key].title);
            });

            // 去重複
            let allSealineName = Array.from(new Set(sealineName));

            // 海灘段
            for (let i = 0; i < allSealineName.length; i += 1) {
                let resultObject = {};
                let resultJson = [];
                resultObject.city = cityName;
                resultObject.title = allSealineName[i];

                // 所有資料
                for (let j = 0; j < beachData.length; j += 1) {
                    // 若相同則將該geojson的經緯度合併成一個array
                    if (allSealineName[i] === beachData[j].title) {
                        resultJson.push(beachData[j].geojson.coordinates);
                    }
                }

                // 拆解第一層array
                let merged = [].concat.apply([], resultJson);

                // // 拆解第二層array
                // let nextMerged = [].concat.apply([], merged);
                // // 去除重複的經緯度值
                // let deduplicationArray = Array.from(new Set(nextMerged));

                // // 合併為原先coordinates的array，例如[lat, lon]
                // let reArray =[]; 
                // while (deduplicationArray.length > 0) {
                //     reArray.push(deduplicationArray.splice(0,2));
                // }

                // 統整資料
                resultObject.geojson = {
                    type: "LineString",
                    coordinates: merged
                };
                // 整合成最後的結果
                resultArray.push(resultObject);
            }

            resolve(resultArray);
        })
    }
}

function insetToDatabase(data) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'INSERT INTO targets(id, title, description, geojson, ref_url, is_open, created_by, created, modified_by, modified) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            values: [uuid(), data.title, "", data.geojson, "", false, "fd6e1fc0-e116-44c8-8bda-5de78e48568b", onTime(), "fd6e1fc0-e116-44c8-8bda-5de78e48568b", onTime()],
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
