module.exports = class GetNotification {
    // 提取淨灘通報
    getNotificationData(req, res, next) {
        const data1 = {
            id: 1,
            targetID: 2,
            targetName: "黃金海岸",
            description: "黃金海岸需要淨灘",
            imageURL: "https://i.imgur.com/FZIV7sy.jpg",
            isOpen: 1,
            auther: "王小明",
            editor: "陳大明",
            createDate: "2018-01-01",
            updateData: "2018-01-15"
        }
        const data2 = {
            id: 2,
            targetID: 3,
            targetName: "旗津海岸",
            description: "旗津海岸需要淨灘",
            imageURL: "https://i.imgur.com/FZIV7sy.jpg",
            isOpen: 1,
            auther: "陳大明",
            editor: "王小明",
            createDate: "2018-01-01",
            updateData: "2018-01-15"
        }

        const resultData = [];
        resultData.push(data1);
        resultData.push(data2);
        res.json({
            result: resultData
        })
    }
}