'use strict'

const {insert, removeLower} = require('./lib/sorted-array')

const START = 1
const END = 0

const findStartsEnds = (length, getBucket, getMonotonic) => {
	if ('function' !== typeof getBucket) {
		throw new Error('getBucket must be a function')
	}
	if ('function' !== typeof getMonotonic) {
		throw new Error('getMonotonic must be a function')
	}

	let latestMonotonic = -Infinity
	let streaks = new Map()
	const expiringSoon = []

	const check = (item) => {
		const bucket = getBucket(item)
		const monotonic = getMonotonic(item)
		let changes = []

		// a lot of time has passed, flush all
		if ((monotonic - latestMonotonic) > length) {
			latestMonotonic = monotonic
			changes = flush()
		}

		const expiredBuckets = removeLower(expiringSoon, monotonic)
		for (let i = 0; i < expiredBuckets.length; i ++) {
			const bucket = expiredBuckets[i]
			changes.push(bucket, END)
			streaks.delete(bucket)
		}

		if (streaks.has(bucket)) {
			const expiringAt = streaks.get(bucket)
			if (monotonic > expiringAt) {
				changes.push(bucket, END, bucket, START)
			}
		} else {
			changes.push(bucket, START)
		}

		latestMonotonic = monotonic
		const expiringAt = monotonic + length
		streaks.set(bucket, expiringAt)
		insert(expiringSoon, expiringAt, bucket)

		return changes
	}

	const flush = () => {
		const changes = new Array(streaks.size * 2)
		let i = 0
		for (const bucket of streaks.keys()) {
			changes[i++] = bucket
			changes[i++] = END
		}

		streaks = new Map() // reset
		return changes
	}

	return {
		check,
		flush,
	}
}

findStartsEnds.START = START
findStartsEnds.END = END
module.exports = findStartsEnds
