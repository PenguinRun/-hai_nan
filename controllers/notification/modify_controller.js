const createNotification = require('../../models/notification/create_model');
const updateNotification = require('../../models/notification/update_model');
const deleteNotification = require('../../models/notification/delete_model');

module.exports = class ModifyNotification {
    // 建立淨灘通報
    postNotificationData(req, res, next) {
        const targetID = req.body.targetID;
        const description = req.body.description;
        const imageURL = req.body.imageURL;
        const isOpen = req.body.beachClear;

        const notificationData = {
            targetID: targetID,
            description: description,
            imageURL: imageURL,
            isOpen: isOpen, 
            createdBy: "fd6e1fc0-e116-44c8-8bda-5de78e48568b",
            modifyBy: "fd6e1fc0-e116-44c8-8bda-5de78e48568b"
        }

        for (let key in notificationData) {
            if (notificationData[key] === null || notificationData[key] === undefined) {
                res.status(400).json({
                    result: {
                        state: "建立淨灘通報失敗！",
                        err: "請輸入 " + key +" 值。"
                    }
                })
                return;
            }
        }

        createNotification(notificationData).then(result => {
            res.json({
                result: {
                    state: "建立淨灘通報成功！",
                    createData: result
                }
            })
        }, err =>{
            res.json({
                result: err
            })
        })
    }
    // 更改淨灘通報
    putNotificationData(req, res, enxt) {
        const id = req.query.id;

        const targetID = req.body.targetID;
        const description = req.body.description;
        const imageURL = req.body.imageURL;
        const isOpen = req.body.beachClear;

        const notificationData = {
            id: id,
            targetID: targetID,
            description: description,
            imageURL: imageURL,
            isOpen: isOpen,
            modifyBy: "e0dcd1aa-a24e-4d5a-a945-9ce885ad7bff"
        }
        updateNotification(notificationData).then(result => {
            res.json({
                state: "更改淨灘通報成功！",
                result: result
            })
        }, err => {
            res.json({
                state: "更改淨灘通報失敗！",
                result: err
            })
        })
    }
    // 刪除淨灘通報
    deleteNotificationData(req, res, next) {
        const id = req.query.id;

        deleteNotification(id).then(result => {
            res.json({
                state: "刪除淨灘通報成功！",
                result: "刪除編號： " + result + " 成功！"
            })
        }, err => {
            res.json({
                state: "刪除淨灘通報失敗！",
                result: err
            })
        })
    }
}