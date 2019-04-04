const { envelope } = require('./index');


const test_path = [
    'aaaa.bbb',
    'fasdfsfsfsafsafas.fdafa[fsdffass]["fs.fd\\"sa.af.sd.fadffass"].sfds.afs.af.saf.sa.f.saf.s.ad.fasfsafasf',
    'a.b',
    'a.b.1',
    '',
    null,
    ['a', 'b'],
    ['a', 'b', '0'],
    ['a', 'b', '5'].join('.'),
    ['a', 'b', '3', 'abc'],
];

const picker = envelope({ a: { b: ['a.b.0', 'a.b.1'] } });

test_path.forEach(path => console.log(path, '===>', picker.pick(path, '##defaultValue##')))
