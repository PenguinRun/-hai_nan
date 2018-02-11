const createNotification = require('../../models/notification/create_model');
const updateNotification = require('../../models/notification/update_model');
const deleteNotification = require('../../models/notification/delete_model');
const verify = require('../../models/login/verification_model');
const Check = require('../../service/check_value');

check = new Check();

module.exports = class ModifyNotification {
    // 建立淨灘通報
    postNotificationData(req, res, next) {
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
                    const targetID = req.body.targetID;
                    const description = req.body.description;
                    const imageURL = req.body.imageURL;
                    const beachClean = req.body.beachClean;

                    const notificationData = {
                        targetID: targetID,
                        imageURL: imageURL,
                        beachClean: beachClean,
                    }

                    for (let key in notificationData) {
                        if (notificationData[key] === null || notificationData[key] === undefined) {
                            res.status(400).json({
                                result: {
                                    state: "建立淨灘通報失敗！",
                                    err: "請輸入 " + key + " 值。"
                                }
                            })
                            return;
                        }
                    }
                    notificationData.createdBy = tokenResult;
                    notificationData.modifyBy = tokenResult;
                    // notificationData.createdBy = "fd6e1fc0-e116-44c8-8bda-5de78e48568b";
                    // notificationData.modifyBy = "fd6e1fc0-e116-44c8-8bda-5de78e48568b";
                    notificationData.description = description;

                    createNotification(notificationData).then(result => {
                        res.json({
                            result: {
                                result: result
                            }
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
    // 更改淨灘通報
    putNotificationData(req, res, enxt) {
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

                    const targetID = req.body.targetID;
                    const description = req.body.description;
                    const imageURL = req.body.imageURL;
                    const beachClean = req.body.beachClean;

                    const notificationData = {
                        id: id,
                        targetID: targetID,
                        description: description,
                        imageURL: imageURL,
                        beachClean: beachClean,
                        // modifyBy: "e0dcd1aa-a24e-4d5a-a945-9ce885ad7bff"
                        modifyBy: tokenResult
                    }
                    updateNotification(notificationData).then(result => {
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
    // 刪除淨灘通報
    deleteNotificationData(req, res, next) {
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
                    deleteNotification(id).then(result => {
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
}