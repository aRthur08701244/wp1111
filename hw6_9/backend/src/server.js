import express from 'express';
import cors from 'cors';
import db from './db'
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 4000;
const path = require('path');

if (process.env.NODE_ENV === 'deployment') {
    app.use(cors());
}

app.use(express.json());
app.use('/', routes)

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, "../frontend", "build")))
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
    })
}


db.connect();



app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})