var seedrandom = require('seedrandom');
const randomFixSeed = seedrandom('Over my dead body');

const genNumber = () => {
    // global.RealNumber = Math.floor(randomFixSeed() / (100 - 1 + 1) + 1)
    global.RealNumber = 0

    while ( (1 > global.RealNumber) || (global.RealNumber > 100) ){
        global.RealNumber = Math.floor(randomFixSeed()*100)
    }
}

const getNumber = (guessedNumber, res) => {
    try {
        if (guessedNumber == global.RealNumber) {res.json({ msg: "Equal" })}
        else if ((100 >= guessedNumber) && (guessedNumber > global.RealNumber)) {res.json({ msg: "Smaller" })}
        else if ((1 <= guessedNumber) && (guessedNumber < global.RealNumber)) {res.json({ msg: "Bigger" })}
        else { res.status(406).send({ msg: "Not a number or Not in range [1, 100]" }) }
    } catch (error) {
        // res.status(406).send({ msg: "Not a number or Not in range [1, 100]" })
    }
}

export { genNumber, getNumber }