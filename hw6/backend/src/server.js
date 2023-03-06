import express from 'express';
import cors from 'cors';
import db from './db'
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/', routes)

db.connect();



app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})