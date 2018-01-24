
module.exports = class ModifyNotification {
    // 建立淨灘通報
    postNotificationData(req, res, next) {
        const targetID = req.body.targetID;
        const description = req.body.description;
        const imageURL = req.body.imageURL;
        const isOpen = req.body.isOpen;

        const notificationData = {
            targetID: targetID,
            description: description,
            imageURL: imageURL,
            isOpen: isOpen
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

        res.json({
            result: {
                state: "建立淨灘通報成功！",
                createData: notificationData
            }
        })
    }
    // 更改淨灘通報
    putNotificationData(req, res, enxt) {

    }
    // 刪除淨灘通報
    deleteNotificationData(req, res, next) {

    }
}