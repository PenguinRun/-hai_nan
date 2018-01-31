const getAllData = require('../../models/beach/get_all_data');

module.exports = class GetBeach {
    // 提取海灘資料
    getBeachData(req, res, next) {
        getAllData().then(result => {
            res.json({
                result: result
            })
        }, err => {
            result: err
        })
    }
    getBeachGeojson(req, res, next) {
        getAllData().then(result => {
            let json = {
              type: 'FeatureCollection',
              features: []
            };
            for(let k in result) {
              let f = {
                type: 'Feature',
                id: result[k].id,
                geometry: {
                  type: 'LineString',
                  coordinates: result[k].geojson
                },
                properties: {
                  city: result[k].city,
                  beachName: result[k].beachName,
                  title: result[k].title,
                  description: result[k].description,
                  refURL: result[k].refURL,
                  beachClean: result[k].beachClean
                }
              };
              json.features.push(f);
            }
            res.json(json);
        }, err => {
            result: err
        })
    }
}
