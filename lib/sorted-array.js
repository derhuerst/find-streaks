'use strict'

const {deepStrictEqual: eql} = require('assert')

const insert = (arr, monotonic, val) => {
	// todo: binary search for performance
	let i = 0
	while (
		i < arr.length &&
		monotonic >= arr[i] &&
		val !== arr[i + 1]
	) i += 2
	let j = i
	while (j < arr.length) {
		if (val === arr[j + 1]) arr.splice(j, 2)
		else j += 2
	}
	arr.splice(i, 0, monotonic, val)
}

const a = []
insert(a, 3, 11)
eql(a, [3, 11])

insert(a, 1, 22)
eql(a, [1, 22, 3, 11])

// test replacing
insert(a, 1.1, 22)
eql(a, [1.1, 22, 3, 11])
insert(a, 3.3, 11)
eql(a, [1.1, 22, 3.3, 11])

insert(a, 1.1, 33)
eql(a, [1.1, 22, 1.1, 33, 3.3, 11])

insert(a, 2, 44)
eql(a, [1.1, 22, 1.1, 33, 2, 44, 3.3, 11])

insert(a, 6, 55)
eql(a, [1.1, 22, 1.1, 33, 2, 44, 3.3, 11, 6, 55])

const removeLower = (arr, monotonic) => {
	const lower = []
	let i = 0
	while (i < arr.length && monotonic > arr[i]) {
		lower.push(arr[i + 1])
		i += 2
	}

	arr.splice(0, i)
	return lower
}

eql(removeLower(a, 1.5), [22, 33])
eql(a, [2, 44, 3.3, 11, 6, 55])

eql(removeLower(a, 6), [44, 11])
eql(a, [6, 55])

eql(removeLower(a, Infinity), [55])
eql(a, [])

module.exports = {
	insert,
	removeLower,
}
