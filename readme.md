# find-streaks

**Finds streaks of equal/same item**, based on a [monotonically](https://en.wikipedia.org/wiki/Monotonic_function) increasing "time" property of them.

[![npm version](https://img.shields.io/npm/v/find-streaks.svg)](https://www.npmjs.com/package/find-streaks)
[![build status](https://api.travis-ci.org/derhuerst/find-streaks.svg?branch=master)](https://travis-ci.org/derhuerst/find-streaks)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/find-streaks.svg)
![minimum Node.js version](https://img.shields.io/node/v/find-streaks.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)

The following table shows how `find-streaks` works with a streak length of `3`.

```
monotonic
timer      bucket  output
-------------------------
0          A       A starts
1          A
2          B       B starts
2          C       C starts
5          C       A ends
6          B       B ends, B starts
end                C ends, B ends
```


## Installation

```shell
npm install find-streaks
```


## Usage

These items represent the chart above:

```js
const item1 = [0, 'a']
const item2 = [1, 'a']
const item3 = [2, 'b']
const item4 = [2, 'c']
const item4 = [5, 'c']
const item5 = [6, 'b']
```

Two items can be part of a streak if they have the same `bucket(item)`. Using `monotonic(item)`, `find-streaks` will tell if two items are part of a streak.

```js
const streakLength = 3
const bucket = item => item[1]
const monotonic = item => item[0]
```

## keeping only the last item of each streak

```js
const keepLastOfStreaks = require('find-streaks')

const {check, flush} = keepLastOfStreaks(streakLength, bucket, monotonic)

check(item1) // []
check(item2) // []
check(item3) // []
check(item4) // []
check(item5) // [item2]
check(item6) // [item3]
flush() // [item5, item6]
```

### as a [transform stream](https://nodejs.org/api/stream.html#stream_class_stream_transform)

```js
const keepLastStream = require('find-streaks/stream')

const keepLast = keepLastStream(streakLength, bucket, monotonic)
keepLast.on('data', console.log)
keepLast.write(item1)
// …
keepLast.end()
```

### as a [callbag](https://github.com/callbag/callbag#callbag-) operator

```js
const keepLastCallbag = require('find-streaks/callbag')
const {pipe, fromIter, forEach} = require('callbag-basics')

const keepLast = keepLastCallbag(streakLength, bucket, monotonic)

pipe(
	fromIter([item1, item2, item3, item4, item5, item6]),
	keepLast,
	forEach(console.log)
)
```

## finding raw starts & ends of streaks

```js
const findStartsEnds = require('find-streaks/starts-ends')
const {START, END} = findStartsEnds

const {check, flush} = findStartsEnds(streakLength, bucket, monotonic)

check(item1) // ['a', START]
check(item2) // []
check(item3) // ['b', START]
check(item4) // ['c', START]
check(item5) // ['a', END]
check(item6) // ['b', END, 'b', START]
flush() // ['c', END, 'b', END]
```


## Related

- [`lodash.debounce`](https://lodash.com/docs/4.17.15#debounce)
- [`lodash.throttle`](https://lodash.com/docs/4.17.15#throttle)
- [`callbag-keep-sequences`](https://github.com/derhuerst/callbag-keep-sequences) – A callbag operator that passes through only sequences with minimum length.
- [`flatten-overlapping-ranges`](https://github.com/derhuerst/flatten-overlapping-ranges) – Flatten overlapping ranges into a sequence of sections.


## Contributing

If you have a question or need support using `find-streaks`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, use [the issues page](https://github.com/derhuerst/find-streaks/issues).
