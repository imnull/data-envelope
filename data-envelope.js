const { pick, BLANK_PATH } = require('./picker');
const pathResolver = require('./path-resolver');

class DataEnvelope {
    constructor(data){
        this.data = data;
    }

    pick(path = BLANK_PATH, defaultValue = undefined){
        path = pathResolver(path);
        return pick(this.data, path, defaultValue)
    }
}

module.exports = DataEnvelope;