'use strict'

const keepLastOfStreaks = require('.')

const START = 0
const DATA = 1
const STOP = 2

const createKeepLastCallbag = (length, getBucket, getMonotonic, opt = {}) => {
	const {
		check,
		flush,
	} = keepLastOfStreaks(length, getBucket, getMonotonic)

	const listenable = (source) => (signal, sink) => {
		if (signal !== START) return;

		let talkback = () => {}
		const onSourceSignal = (signal, payload) => {
			if (signal === START) talkback = payload
			if (signal === STOP) {
				for (const item of flush()) sink(DATA, item)
			}
			if (signal !== DATA) {
				sink(signal, payload) // pass signal on
				return;
			}

			for (const item of check(payload)) sink(DATA, item)
			talkback(DATA) // request more
		}

		source(START, onSourceSignal)
	}
	return listenable
}

module.exports = createKeepLastCallbag
