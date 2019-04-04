const trim = s => s.replace(/^\s+|\s+$/g, '');
const trimQuote = s => s.replace(/^(['"`])(.*)\1$/, '$2');

const ESCAPE = '\\';
const is_quote = c => (c === `'` || c === `"` || c === '`');
const read_quote = (s, start) => {
    let q = s[start++], c, i = start, len = s.length;
    for(; i < len; i++){
        c = s[i];
        if(c === ESCAPE){
            i += 1;
            continue;
        } else if(c === q) {
            return i;
        }
    }
    return -1;
};

const NEST = { '[': ']' };
const is_nest = c => c in NEST;
const read_nest = (s, start) => {
    let left = s[start++], right = NEST[left], c, i = start, len = s.length;
    for(; i < len; i++){
        c = s[i];
        if(is_quote(c)){
            let _i = read_quote(s, i);
            if(_i < i){
                return -1;
            }
            i = _i;
        } else if(is_nest(c)){
            let _i = read_nest(s, i);
            if(_i < i){
                return -1;
            }
            i = _i + 1;
        } else if(c === right) {
            return i;
        }
    }
    return -1;
}

const SPLITER = '.';
const read = (s, start = 0, r = []) => {
    let i = start, _i = i, len = s.length, c;
    for(; i < len; i++){
        c = s[i];
        if(c === SPLITER){
            if(i > _i){
                r.push(s.substring(_i, i));
            }
            _i = i + 1;
        } else if(is_nest(c)){
            if(i > _i){
                r.push(s.substring(_i, i));
            }
            _i = i;
            i = read_nest(s, i);
            if(i > -1){
                let ss = trimQuote(trim(s.substring(_i + 1, i)))
                r.push(ss);
                _i = i + 1;
            } else {
                return null;
            }
        }
    }
    if(i > _i){
        r.push(s.substring(_i, i));
    }
    return r;
}

const resolve = (path) => {
    if(Array.isArray(path)){
        return path;
    } else if(typeof(path) === 'string'){
        return read(path);
    } else {
        return [path];
    }
}

module.exports = resolve;