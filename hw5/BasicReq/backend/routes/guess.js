import express from "express";
import { genNumber, getNumber } from "../core/getNumber";

const router = express.Router()

router.post('/start', (_, res) => {
    genNumber()
    res.json({ msg: "The game has started." })
    // console.log(global.RealNumber)
})

router.get('/guess', (req, res) => {
    // req.query.number
    // let realNumber = global.RealNumber
    let guessedNumber = req.query.number
    getNumber(guessedNumber, res)
})

router.post('/restart', (_, res) => {
    // genNumber()
    // res.json({ msg: "The game has restarted." })
    // console.log(global.RealNumber)
})

export default router