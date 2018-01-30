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
}
