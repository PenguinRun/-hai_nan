const client = require('../../config/postgresql');
const onTime = require('../../service/on_time');
const uuid = require('uuid/v4');

module.exports = function registerAction(data) {
    return new Promise(async (resolve, reject) => {

        const hasRegister = await checkRegister(data.id);

        // 若會員資料已經寫入
        if (hasRegister === true) {
            await updateRegister(data);
            resolve("舊會員");
        } // 若會員資料還未寫入
        else if (hasRegister === false) {
            await insertRegisterData(data);
            resolve("新會員")
        }
    })
}

// 確定會員是否已經註冊
function checkRegister(id) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'SELECT fb_id FROM members WHERE fb_id=($1)',
            values: [id]
        }
        client.query(query, (err, res) => {
            if (res.rows[0] === null || res.rows[0] === undefined) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

// 登入時註冊資料，可再增加displayName及大頭貼(img)。
function updateRegister(data) {
    return new Promise((resolve, reject) => {
        const query = {
            text: 'UPDATE members SET email=($1), modified=($2) WHERE fb_id=($3)',
            values: [data.email, onTime(), data.id],
        }
        client.query(query, (err, res) => {
            let result = {};
            if (err) {
                console.log(err.stack);
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

function insertRegisterData(data) {
    const query = {
        text: 'INSERT INTO members(id, fb_id, email, password, created, modified) VALUES($1, $2, $3, $4, $5, $6)',
        values: [uuid(), data.id, data.email, "", onTime(), onTime()],
    }
    client.query(query, (err, res) => {
        let result = {};
        if (err) {
            console.log(err.stack);
            result.status = "登入淨灘系統失敗！";
            result.err = "伺服器錯誤。";
            reject(err);
        } else {
            result.status = "登入淨灘系統成功！";
            result.data = data;
            resolve(result);
        }
    })
}