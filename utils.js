const BLANK_PATH = [];
const invalid = v => typeof(v) === 'undefined' || v === null;
const is_uint = s => {
    if(typeof(s) === 'string' && /^\d+$/.test(s)){
        s = parseInt(s);
    }
    return Number(s) >= 0;
}

module.exports = {
    BLANK_PATH,
    invalid,
    is_uint,
};