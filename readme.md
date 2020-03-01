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

Two items can be part of a streak if they have the same `bucket(item)`. Using `monotonic(item)`, `find-streaks` will tell if two items are part of a streak.

```js
const findStreaks = require('find-streaks')
const {START, END} = findStreaks

const streakLength = 3
const bucket = item => item[1]
const monotonic = item => item[0]
const {check, flush} = findStreaks(streakLength, bucket, monotonic)

check([0, 'a']) // ['a', START]
check([1, 'a']) // []
check([2, 'b']) // ['b', START]
check([2, 'c']) // ['c', START]
check([5, 'c']) // ['a', END]
check([6, 'b']) // ['b', END, 'b', START]
flush() // ['c', END, 'b', END]
```


## Related

- [`lodash.debounce`](https://lodash.com/docs/4.17.15#debounce)
- [`lodash.throttle`](https://lodash.com/docs/4.17.15#throttle)
- [`callbag-keep-sequences`](https://github.com/derhuerst/callbag-keep-sequences) – A callbag operator that passes through only sequences with minimum length.
- [`flatten-overlapping-ranges`](https://github.com/derhuerst/flatten-overlapping-ranges) – Flatten overlapping ranges into a sequence of sections.


## Contributing

If you have a question or need support using `find-streaks`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, use [the issues page](https://github.com/derhuerst/find-streaks/issues).
