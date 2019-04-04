# data-envelope
数据包装器


## 安装

    $ npm i data-envelope

## 使用

    const { envelope } = require('data-envelope');

    const picker = envelope({
        a: {
            b: ['a.b.0', 'a.b.1'],
            c: { 'a.b': 'bingo' }
        },
    });
    picker.pick('a.b', '##defaultValue##');
    picker.pick('a.c', '##defaultValue##');
    picker.pick('a.c[a.b]', '##defaultValue##');

## 模组

### DataEnvelope
对数据进行简单封装，开放一个方法`pick`来拾取路径值。

### picker
可以安全地拾取对象路径的值。当路径不通或者拾取失败，则返回用户指定的默认值。

### path-resolver
解析路径表达式

    a.b.c => ['a', 'b', 'c']
    a.b[0]["a.b.c"] => ['a', 'b', '0', 'a.b.c']
    ['a'].6[b.c][d] => ['a', '6', 'b.c', 'd']
    '' => 数据本身
