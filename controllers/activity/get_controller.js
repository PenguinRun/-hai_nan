const getActivity = require('../../models/activity/get_model');

module.exports = class GetActivity {
    getActivityData(req, res, next) {
        getActivity().then(result => {
            res.json({
                result: result
            })
        }, err => {
            res.json({
                result: err
            })
        })
    }
}