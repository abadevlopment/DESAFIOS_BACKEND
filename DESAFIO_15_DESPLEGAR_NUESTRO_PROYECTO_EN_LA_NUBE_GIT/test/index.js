const numbers = []
const obj = {}

for (let i = 0; i < 10000; i++) {
    let value = Math.ceil(Math.random() * 20)
    numbers.push(value)
}

numbers.forEach(function (x) {
    obj[x] = (obj[x] || 0) + 1
})

console.log(obj);