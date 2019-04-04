# data-envelope
数据包装器

NPM: https://www.npmjs.com/package/data-envelope

## 安装

    npm i data-envelope

## 初衷

我们可能经常需要这样处理数据

    if (result.data.data.data1.code === 0) return false;
    result.data.data.data1 = result.data.data.data1 || {};
    result.data.data.data1.data = result.data.data.data1.data || {};

    if(!result.data.data.data1.data.itemInfoVo){
      result.data.data.data1.data.itemInfoVo = {};
    }
    //...

像`result.data.data.data1.data`这种调用，无论是读取或是赋值，都是不安全的。如果数据对象结构不严格，中间的路径链条断掉，则会发生报错。

安全的做法是：

    // if (result.data.data.data1.code === 0) return false;
    if(result
        && result.data
        && result.data.data
        && result.data.data.data1
        && result.data.data.data1.code === 0) return false

为了避免这种书写问题，使用`data-envelope`进行安全读取，代码改动成本较低，可以有效增强系统健壮性。

    const { envelope } = require('data-envelope');

    //...

    const r = envelope(result);

    // if (result.data.data.data1.code === 0) return false;
    if(r.pick('data.data.data1.code') === 0) return false;

    // result.data.data.data1 = result.data.data.data1 || {};
    r.inject(
        'data.data.data1',
        r.pick('data.data.data1', {})
    );

    // result.data.data.data1.data = result.data.data.data1.data || {};
    r.inject(
        'data.data.data1.data',
        r.pick('data.data.data1.data', {})
    );

    // if(!result.data.data.data1.data.itemInfoVo){
    if(!r.pick('data.data.data1.data.itemInfoVo')){
      // result.data.data.data1.data.itemInfoVo = {};
      r.inject('data.data.data1.data.itemInfoVo', {})
    }
    //...

这看起来并不优雅，但确实可以增强健壮性。更优雅的方案，建议使用`Proxy`对象进行对象标签拦截，但`Proxy`对ES版本要求较高，会有兼容问题。

## 安装

    $ npm i data-envelope

## 使用

    const { envelope } = require('data-envelope');

    const env = envelope({
        a: {
            b: ['a.b.0', 'a.b.1'],
            c: { 'a.b': 'bingo' }
        },
    });

    env.pick('a.b', '##defaultValue##');
    env.pick('a.c', '##defaultValue##');
    env.pick('a.c[a.b]', '##defaultValue##');

    env.inject('aaaa[0]', 123);
    env.inject('bbbb.ccc', 123);
    env.inject(['c', 1], 123);
    env.inject(['a', 'b', 'c', '0', 'a'], 123);


## 模组

### DataEnvelope
对数据进行简单封装，开放`pick` `inject`来拾取和注入路径值值。

### picker
可以安全地拾取对象路径的值。当路径不通或者拾取失败，则返回用户指定的默认值。

### injecter
可以按指定路径，向对象注入值。

### path-resolver
解析路径表达式，兼容大部分对象/数组标签取值写法，规则相对要松散一些。

    a.b.c => ['a', 'b', 'c']
    a.b[0]["a.b.c"] => ['a', 'b', '0', 'a.b.c']
    ['a'].6[b.c][d] => ['a', '6', 'b.c', 'd']
    '' => 数据本身
