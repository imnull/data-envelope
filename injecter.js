const { is_uint, invalid } = require('./utils');

const inject = (target, path, value) => {
    if(path.length < 1){
        return value;
    } else {
        path = path.slice();
        let key = path.shift();
        if(invalid(target)){
            target = is_uint(key) ? [] : {};
        }
        target[key] = inject(target[key], path, value);
        return target;
    }
};

module.exports = { inject };
