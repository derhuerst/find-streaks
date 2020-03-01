'use strict'

const findStartsEnds = require('./starts-ends')
const {END, START} = findStartsEnds

const keepLastOfStreaks = (length, getBucket, getMonotonic, opt = {}) => {
	const {
		store,
	} = {
		store: new Map(),
		...opt,
	}

	const {
		check: _check,
		flush: _flush,
	} = findStartsEnds(length, getBucket, getMonotonic)

	const check = (item) => {
		const bucket = getBucket(item)
		const ended = []

		const changes = _check(item)
		for (let i = 0; i < changes.length; i += 2) {
			const bucket = changes[i]
			const ev = changes[i + 1]
			if (ev === END) {
				ended.push(store.get(bucket))
				store.delete(bucket)
			}
		}

		store.set(bucket, item)
		return ended
	}

	const flush = () => {
		const ended = []
		const changes = _flush()
		for (let i = 0; i < changes.length; i += 2) {
			const bucket = changes[i]
			ended.push(store.get(bucket))
			store.delete(bucket)
		}
		return ended
	}

	return {
		check,
		flush,
	}
}

module.exports = keepLastOfStreaks
