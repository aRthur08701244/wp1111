import express from "express";
import { genNumber, getNumber } from "../core/getNumber";

const router = express.Router()

router.post('/start', (_, res) => {
    try {
        genNumber()
        res.json({ msg: "The game has started." })
    } catch (error) {res.status(500).send({ msg: "500 Internal Server Error (Not Able to Start)" })}
    
})

router.get('/guess', (req, res) => {
    // req.query.number
    // let realNumber = global.RealNumber
    try {
        let guessedNumber = req.query.number
        getNumber(guessedNumber, res)
    } catch (error) {res.status(500).send({ msg: "500 Internal Server Error (Not able to Guess)" })}
})

router.post('/restart', (_, res) => {
    // genNumber()
    // res.json({ msg: "The game has restarted." })
    // console.log(global.RealNumber)
})

export default router