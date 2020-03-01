'use strict'

const {Suite} = require('benchmark')
const data = require('./data.json')
const findStreaks = require('..')

const suite = new Suite()
suite

.add('50000 items, 5000 streak, ~256 buckets', () => {
	const {check, flush} = findStreaks(5000, i => i.kind, i => i.t)
	for (let i = 0; i < data.length; i++) check(data[i])
	flush()
})

.on('cycle', ({target}) => {
	const perRun = Math.round(target.times.period * 100) / 100
	console.log(`${target} (${perRun}s/run)`)
})
.on('error', ({target}) => {
	console.error(target.error)
	process.exit(1)
})
.run()
