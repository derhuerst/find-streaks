'use strict'

const {deepStrictEqual: eql} = require('assert')
const findStreaks = require('.')
const {START, END} = findStreaks

const length = 3
const bucket = item => item.kind
const monotonic = item => item.t
const {check, flush} = findStreaks(length, bucket, monotonic)

eql(check({kind: 'a', t: 0}), ['a', START])

eql(check({kind: 'a', t: 1}), [])

eql(check({kind: 'b', t: 2}), ['b', START])

eql(check({kind: 'c', t: 2}), ['c', START])

eql(check({kind: 'c', t: 5}), ['a', END])

eql(check({kind: 'b', t: 6}), ['b', END, 'b', START])

eql(flush(), ['c', END, 'b', END])
