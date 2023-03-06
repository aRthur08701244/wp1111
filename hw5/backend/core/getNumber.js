var seedrandom = require('seedrandom');
// const randomFixSeed = seedrandom('Over my dead body');
const d = new Date();
const dt = d.getTime();
const randomFixSeed = seedrandom(String(dt));
// let RealNumber = []

const genNumber = () => {
    // global.RealNumber = Math.floor(randomFixSeed() / (100 - 1 + 1) + 1)
    global.RealNumber = []

    for (let i = 0; i < 4; i++) {
        let oneNumber = Math.floor(randomFixSeed()*10)
        while ( (0 > oneNumber) || (oneNumber >= 10) || (global.RealNumber.indexOf(oneNumber) !== -1) ){
            oneNumber = Math.floor(randomFixSeed()*10)
        }
        global.RealNumber.push(oneNumber)
    }
    console.log(global.RealNumber)
}



const getNumber = (guessedNumber, res) => {
    console.log(global.RealNumber)
    
    if (((guessedNumber.length == 4) && (guessedNumber > -1)) == false) { res.status(406).send({ msg: "Not a valid number." }) }
    else {
        let a = 0
        let b = 0
        for (let i = 0; i < 4; i++) {
            // console.log(global.RealNumber)
            if (guessedNumber[i] == global.RealNumber[i]) { a = a+1 }
            else {
                for (let j = 0; j < 4; j++) {
                    if (guessedNumber[i] == global.RealNumber[j]) { b = b+1 }
                }
            }
        }
        res.json({ A: a, B: b })
    }
}

export { genNumber, getNumber }