const createActivity = require('../../models/activity/create_model');
const updateActivity = require('../../models/activity/update_model');
const deleteActivity = require('../../models/activity/delete_model');


module.exports = class ModifyActivity {
    // 建立淨灘活動
    postActivityData(req, res, next) {
        // 缺少登入判斷

        const activityData = {
            targetID: req.body.targetID,
            title: req.body.title,
            description: req.body.description,
            contact: req.body.contact,
            dateTime: req.body.dateTime,
            place: req.body.place,
        }

        for (let key in activityData) {
            if (activityData[key] === null || activityData[key] === undefined) {
                res.status(400).json({
                    result: {
                        state: "建立淨灘活動失敗！",
                        err: "請輸入 " + key + " 值。"
                    }
                })
                return;
            }
        }

        activityData.createdBy = "e0dcd1aa-a24e-4d5a-a945-9ce885ad7bff";
        activityData.modifyBy = "e0dcd1aa-a24e-4d5a-a945-9ce885ad7bff";
        activityData.refURL = req.body.refURL;

        createActivity(activityData).then(result => {
            res.json({
                result: result
            })
        }, err => {
            res.json({
                result: err
            })
        })
    }
    // 更改淨灘活動
    putActivityData(req, res, next) {
        const id = req.query.id;
        const activityData = {
            id: id,
            targetID: req.body.targetID,
            title: req.body.title,
            description: req.body.description,
            contact: req.body.contact,
            dateTime: req.body.dateTime,
            place: req.body.place,
            modifyBy: "e0dcd1aa-a24e-4d5a-a945-9ce885ad7bff",
            refURL: req.body.refURL
        }
        updateActivity(activityData).then(result => {
            res.json({
                status: result
            })
        }, err => {
            res.json({
                result: err
            })
        })
    }
    // 刪除淨灘活動
    deleteActivityData(req, res, next) {
        const id = req.query.id;
        deleteActivity(id).then(result => {
            res.json({
                status: result
            })
        }, err => {
            res.json({
                result: err
            })
        })
    }
}