'use strict'

const {pipe, fromIter, forEach} = require('callbag-basics')
const keepLastCallbag = require('../callbag')

const streakLength = 3
const bucket = item => item.kind
const monotonic = item => item.t
const keepLast = keepLastCallbag(streakLength, bucket, monotonic)

pipe(
	fromIter([
		{kind: 'a', t: 0},
		{kind: 'a', t: 1},
		{kind: 'b', t: 2},
		{kind: 'c', t: 2},
		{kind: 'c', t: 5},
		{kind: 'b', t: 6},
	]),
	keepLast,
	forEach(console.log)
)
