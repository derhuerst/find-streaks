'use strict'

const {Transform} = require('stream')
const keepLastOfStreaks = require('.')

const createKeepLastOfStreaksStream = (length, getBucket, getMonotonic, opt = {}) => {
	const {
		check,
		flush,
	} = keepLastOfStreaks(length, getBucket, getMonotonic)

	const out = new Transform({
		objectMode: true,
		...opt,
		transform: (newItem, _, cb) => {
			for (const item of check(newItem)) out.push(item)
			cb()
		},
		flush: (cb) => {
			for (const item of flush()) out.push(item)
			cb()
		}
	})
	return out
}

module.exports = createKeepLastOfStreaksStream
