const invalid = v => typeof(v) === 'undefined' || v === null;
const BLANK_PATH = [];

/**
 * 从对象中提取路径数据
 * @param {Any} data 原始数据
 * @param {Array} path 访问路径
 * @param {Any} defaultValue 默认值
 */
const pick = (data, path, defaultValue) => {
    if(path.length < 1){
        return data;
    } else {
        if(invalid(data)){
            return defaultValue;
        } else {
            path = path.slice(0);
            try {
                return pick(data[path.shift()], path, defaultValue);
            } catch(ex) {
                return defaultValue;
            }
        }
    }
}

module.exports = { invalid, pick, BLANK_PATH };