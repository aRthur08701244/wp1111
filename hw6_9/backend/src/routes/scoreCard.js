import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
import bodyParser from 'body-parser';

const router = Router();
router.use(bodyParser.json());

const deleteCards = async (req, res) => {
    try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    res.json({ message: "Database deleted" })
    } catch (e) {
        throw new Error("Database deletion failed"); }
};

const postCard = async (req, res) => {

    try {
        let name = req.body['name']
        let subject = req.body['subject']
        let score = req.body['score']
        const existing = await ScoreCard.findOne({name, subject});
        if (existing) {
            existing['score'] = score
            existing.save()
            res.json({ message: `Updating (${req.body['name']}, ${req.body['subject']}, ${req.body['score']})`, card: req.body })
        }
        else{
            res.json({ message: `Adding (${req.body['name']}, ${req.body['subject']}, ${req.body['score']})`, card: req.body })
            const newScoreCard = new ScoreCard(req.body);
            return newScoreCard.save();
        }
        
    } catch (e) { throw new Error("ScoreCard creation error: " + e); }

};

const getCards = async (req, res) => {
        let type = req['query']['type']
        let string = req['query']['queryString']
        if (type =='name') { 
            let existing = await ScoreCard.find({name: string})
            if (existing.length != 0) {
                let messagesList = []
                for (let i = 0; i < existing.length; i++) {
                    let item = existing[i]
                    // messagesList.push(`Found card with name: (${item['name']}, ${item['subject']}, ${item['score']})`)
                    messagesList.push( item )
                }
                res.json({messages: messagesList})
            }
            else {
                // throw new Error("ScoreCard query error: " + e);
                res.json({ errorMessage: `Name ${string} not found!`})
            }
        }
        else if (type =='subject') {
            let existing = await ScoreCard.find({subject: string})
            if (existing.length != 0) {
                let messagesList = []
                for (let i = 0; i < existing.length; i++) {
                    let item = existing[i]
                    // messagesList.push(`Found card with subject: (${item['name']}, ${item['subject']}, ${item['score']})`)
                    messagesList.push( item )
                }
                res.json({messages: messagesList})
            }
            else {
                // throw new Error("ScoreCard query error: " + e);
                res.json({ errorMessage: `Subject ${string} not found!`})
            }
        }
}


router.delete('/cards', deleteCards)
router.post("/card", postCard);
router.get("/cards", getCards);

export default router;
