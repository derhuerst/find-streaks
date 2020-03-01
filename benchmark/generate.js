'use strict'

const arr = []
let t = Date.now()
for (let i = 0; i < 50000; i++) {
	arr.push({
		t,
		kind: Math.random().toString(16).slice(2, 4)
	})
	t += Math.round(Math.random() * 2)
}

console.log(JSON.stringify(arr))
