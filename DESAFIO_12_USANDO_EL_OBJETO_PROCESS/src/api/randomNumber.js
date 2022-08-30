

function randomNumber(query) {
    const numbers = []

    for (let i = 0; i < query; i++) {
        let value = Math.ceil(Math.random() * 1000)
        numbers.push(value)
    }

    const obj = {}

    numbers.forEach(function (x) {
        obj[x] = (obj[x] || 0) + 1
    })

    return obj
}

process.on("message", (msg) => {
    console.log("en random llega:");
    const test = !Number.isNaN(Number(msg))
    // console.log(!Number.isNaN(Number(msg)));

    if (test) {
        console.log("llego un numero");
        console.log(Number(msg));

        const randomN = randomNumber(Number(msg))
        process.send(randomN)
    } else {
        console.log("NO llego un numero");
        const randomN = randomNumber(1e8)
        process.send(randomN)
    }

});