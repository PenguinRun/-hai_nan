module.exports = class CheckValue {
    //判斷空值
    checkNull(data) {
        for (var key in data) {
            return false;
        }
        return true;
    }
}