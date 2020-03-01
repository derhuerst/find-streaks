'use strict'

const {deepStrictEqual: eql, throws} = require('assert')
const findStartsEnds = require('./starts-ends')
const keepLastOfStreaks = require('.')
const {START, END} = findStartsEnds

const a0 = {kind: 'a', t: 0}
const a1 = {kind: 'a', t: 1}
const b2 = {kind: 'b', t: 2}
const c2 = {kind: 'c', t: 2}
const c5 = {kind: 'c', t: 5}
const b6 = {kind: 'b', t: 6}

const testFindStartsEnds = () => {
	const length = 3
	const bucket = item => item.kind
	const monotonic = item => item.t
	const {check, flush} = findStartsEnds(length, bucket, monotonic)

	eql(check(a0), ['a', START])
	eql(check(a1), [])
	eql(check(b2), ['b', START])
	eql(check(c2), ['c', START])
	eql(check({kind: null, t: 4}), []) // should be ignored
	throws(() => check({kind: 'c', t: null}))
	eql(check(c5), ['a', END])
	eql(check(b6), ['b', END, 'b', START])
	eql(flush(), ['c', END, 'b', END])
}

const testKeepLastOfStreaks = () => {
	const length = 3
	const bucket = item => item.kind
	const monotonic = item => item.t
	const {check, flush} = keepLastOfStreaks(length, bucket, monotonic)

	eql(check(a0), [])
	eql(check(a1), [])
	eql(check(b2), [])
	eql(check(c2), [])
	eql(check(c5), [a1])
	eql(check(b6), [b2])
	eql(flush(), [c5, b6])
}

testFindStartsEnds()
testKeepLastOfStreaks()
