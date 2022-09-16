class randomNumberContainer {
    constructor(query) {
        this.query = Number(query)
    }

    randomNumber(query) {
        const numbers = []

        function setLength(data) {
            if (data) {
                return data
            }
            return 100000
        }

        const numberLength = setLength(this.query)

        for (let i = 0; i < numberLength; i++) {
            let value = Math.ceil(Math.random() * 20)
            numbers.push(value)
        }

        const obj = {}

        numbers.forEach(function (x) {
            obj[x] = (obj[x] || 0) + 1
        })

        return obj
    }
}

module.exports = randomNumberContainer