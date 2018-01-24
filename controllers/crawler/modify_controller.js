const crawlerAction = require('../../models/crawler/crawler_beach_model');

module.exports = class ModifyCrawler {
    getBeachData(req, res, next) {
        const url = "https://ecolife.epa.gov.tw/geoserver/Ecolife2/ows?service=wfs&version=1.0.0&request=getFeature&outputFormat=application%2Fjson&typeName=Ecolife2%3Aviewsealinesp";
        crawlerAction(url).then(result => {
            res.json({
                result: result
            })
        }, err => {
            result: err
        })
    }
}