module.exports = class GetBeach {
    // 提取淨灘通報
    getBeachData(req, res, next) {
      var pgp = require('pg-promise')(/*options*/);
      var db = pgp('postgres://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_IP + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME);
      db.many('SELECT * FROM targets')
      .then(function (data) {
        res.json({
            result: data
        })
      })
      .catch(function (error) {
        res.json({
            result: 'error'
        })
      })
    }
}
