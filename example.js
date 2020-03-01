'use strict'

const keepLastOfStreaks = require('.')
const {START, END} = keepLastOfStreaks

const item1 = {kind: 'a', t: 0}
const item2 = {kind: 'a', t: 1}
const item3 = {kind: 'b', t: 2}
const item4 = {kind: 'c', t: 2}
const item4 = {kind: 'c', t: 5}
const item5 = {kind: 'b', t: 6}

const streakLength = 3
const bucket = item => item.kind
const monotonic = item => item.t
const {check, flush} = keepLastOfStreaks(streakLength, bucket, monotonic)

console.log(check(item1)) // []
console.log(check(item2)) // []
console.log(check(item3)) // []
console.log(check(item4)) // []
console.log(check(item5)) // [item2]
console.log(check(item6)) // [item3]
console.log(flush()) // [item5, item6]
