const { envelope } = require('./index');

const { inject } = require('./injecter');


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
    'a.c[a.b]',
    'a.c["a.b"]',
    'a.c[`a.b`]',
];

const env = envelope({
    a: {
        b: ['a.b.0', 'a.b.1'],
        c: { 'a.b': 'bingo' }
    },
});

test_path.forEach(path => console.log(path, '===>', env.pick(path, '##defaultValue##')))

console.log(env.inject('aaaa[0]', 123))
console.log(env.inject('bbbb.ccc', 123))
console.log(env.inject(['c', 1], 123))
console.log(env.inject(['a', 'b', 'c', '0', 'a'], 123))
console.log(env.data.a.b.c)

console.log(env.data)