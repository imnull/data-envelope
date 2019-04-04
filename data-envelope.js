const { pick } = require('./picker');
const { inject } = require('./injecter');
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
    pick(path, defaultValue = undefined){
        path = pathResolver(path);
        return pick(this.data, path, defaultValue)
    }

    inject(path, value){
        path = pathResolver(path);
        if(path.length > 0){
            this.data = inject(this.data, path, value);
        }
        return value;
    }
}

module.exports = DataEnvelope;