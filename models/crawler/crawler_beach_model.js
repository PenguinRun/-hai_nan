const request = require('request');

module.exports = function crawlerBeach(url) {
    return new Promise((resolve, reject) => {
        request.get({
            url: url,
        }, function (err, res, body) {
            resolve(JSON.parse(body));
        })
    })
}
