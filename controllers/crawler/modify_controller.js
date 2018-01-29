const crawlerAction = require('../../models/crawler/crawler_beach_model');

module.exports = class ModifyCrawler {
    getBeachData(req, res, next) {
        var pgp = require('pg-promise')(/*options*/);
        var db = pgp('postgres://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_IP + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME);
        var uuid = require('node-uuid');

        const url = "https://ecolife.epa.gov.tw/geoserver/Ecolife2/ows?service=wfs&version=1.0.0&request=getFeature&outputFormat=application%2Fjson&typeName=Ecolife2%3Aviewsealinesp";
        crawlerAction(url).then(result => {
          for(let k in result.features) {
            console.log('processing ' + k);
            db.none('INSERT INTO targets VALUES($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, $8, CURRENT_TIMESTAMP, $9)', [
              uuid.v4(),
              result.features[k].properties.sealinename,
              '',
              JSON.stringify({
                type: 'Feature',
                geometry: result.features[k].geometry
              }),
              'https://ecolife2.epa.gov.tw/coastal/SeaResult.aspx?slid=' + result.features[k].properties.slid,
              '0',
              uuid.v4(),
              uuid.v4(),
              '(0,0)'
            ]);
          }
          res.json({
            hi: 'good'
          })
        }, err => {
            result: err
        })
    }
}
