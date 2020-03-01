'use strict'

const findStreaks = require('.')
const {START, END} = findStreaks

const streakLength = 3
const bucket = item => item[1]
const monotonic = item => item[0]
const {check, flush} = findStreaks(streakLength, bucket, monotonic)

console.log(check([0, 'a'])) // ['a', START]
console.log(check([1, 'a'])) // []
console.log(check([2, 'b'])) // ['b', START]
console.log(check([2, 'c'])) // ['c', START]
console.log(check([5, 'c'])) // ['a', END]
console.log(check([6, 'b'])) // ['b', END, 'b', START]
console.log(flush()) // ['c', END, 'b', END]
