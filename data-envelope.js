const { pick, BLANK_PATH } = require('./picker');
const pathResolver = require('./path-resolver');

class DataEnvelope {
    constructor(data){
        this.data = data;
    }

    /**
     * 拾取对象指定路径的值
     * @param {String|Array} path 路径
     * @param {Any} defaultValue 默认值
     */
    pick(path = BLANK_PATH, defaultValue = undefined){
        path = pathResolver(path);
        return pick(this.data, path, defaultValue)
    }
}

module.exports = DataEnvelope;