const { invalid } = require('./utils');

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
                let key = path.shift();
                return pick(data[key], path, defaultValue);
            } catch(ex) {
                return defaultValue;
            }
        }
    }
};

module.exports = { pick };