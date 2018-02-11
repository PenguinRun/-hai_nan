const createActivity = require('../../models/activity/create_model');
const updateActivity = require('../../models/activity/update_model');
const deleteActivity = require('../../models/activity/delete_model');
const verify = require('../../models/login/verification_model');
const Check = require('../../service/check_value');

check = new Check();

module.exports = class ModifyActivity {
    // 建立淨灘活動
    postActivityData(req, res, next) {
        const token = req.headers['x-access-token'];
        //確定token是否有輸入
        if (check.checkNull(token) === true) {
            res.json({
                err: "請輸入token！"
            })
        } else if (check.checkNull(token) === false) {
            verify(token).then(tokenResult => {
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: "token錯誤。",
                            err: "請重新登入。"
                        }
                    })
                } else {
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

                    activityData.createdBy = tokenResult;
                    activityData.modifyBy = tokenResult;
                    // activityData.createdBy = "e0dcd1aa-a24e-4d5a-a945-9ce885ad7bff";
                    // activityData.modifyBy = "e0dcd1aa-a24e-4d5a-a945-9ce885ad7bff";
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
            })
        }
    }
    // 更改淨灘活動
    putActivityData(req, res, next) {
        const token = req.headers['x-access-token'];
        //確定token是否有輸入
        if (check.checkNull(token) === true) {
            res.json({
                err: "請輸入token！"
            })
        } else if (check.checkNull(token) === false) {
            verify(token).then(tokenResult => {
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: "token錯誤。",
                            err: "請重新登入。"
                        }
                    })
                } else {
                    const id = req.query.id;
                    const activityData = {
                        id: id,
                        targetID: req.body.targetID,
                        title: req.body.title,
                        description: req.body.description,
                        contact: req.body.contact,
                        dateTime: req.body.dateTime,
                        place: req.body.place,
                        // modifyBy: "e0dcd1aa-a24e-4d5a-a945-9ce885ad7bff",
                        modifyBy: tokenResult,
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
            })
        }
    }
    // 刪除淨灘活動
    deleteActivityData(req, res, next) {
        const token = req.headers['x-access-token'];
        //確定token是否有輸入
        if (check.checkNull(token) === true) {
            res.json({
                err: "請輸入token！"
            })
        } else if (check.checkNull(token) === false) {
            verify(token).then(tokenResult => {
                if (tokenResult === false) {
                    res.json({
                        result: {
                            status: "token錯誤。",
                            err: "請重新登入。"
                        }
                    })
                } else {
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
            })
        }
    }
}