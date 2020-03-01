'use strict'

const keepLastStream = require('../stream')

const streakLength = 3
const bucket = item => item.kind
const monotonic = item => item.t

const keepLast = keepLastStream(streakLength, bucket, monotonic)
keepLast.on('data', console.log)

keepLast.write({kind: 'a', t: 0})
keepLast.write({kind: 'a', t: 1})
keepLast.write({kind: 'b', t: 2})
keepLast.write({kind: 'c', t: 2})
keepLast.write({kind: 'c', t: 5})
keepLast.write({kind: 'b', t: 6})
keepLast.end()
