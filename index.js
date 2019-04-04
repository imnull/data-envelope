const DataEnvelope = require('./data-envelope');

module.exports = {
    envelope: (data) => new DataEnvelope(data)
};