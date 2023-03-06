import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

    const app = express();
    const port = process.env.PORT || 4000;

    // Parses the text as JSON and exposes the resulting
    // object on req.body.
    app.use(bodyParser.json());

    app.use(cors());
    app.use(express.json());


    
    app.get('/', (req, res) => {
        res.send('Received a GET HTTP method');
    });
    app.post('/', (req, res) => {
        res.send('Received a POST HTTP method');
        console.log(req.body);
    });
    app.put('/', (req, res) => {
        res.send('Received a PUT HTTP method');
    });
    app.delete('/', (req, res) => {
        res.send('Received a DELETE HTTP method');
    });
    app.post('/users', (req, res) => {
        res.send('POST HTTP method on users resource');
    });
    app.put('/users/:userId', (req, res) => {
    res.send(`PUT HTTP method on users/${req.params.userId} resource`,)
    });

    // app.listen(port, () => {
    //     console.log(`Example app listening on port ${port}!`)
    // });
    app.delete('/cards', (req, res) => {
        res.send('Received a PUT HTTP method');
    })

// curl http://localhost:4000
// curl -X POST http://localhost:4000
// curl -X PUT http://localhost:4000
// curl -X DELETE http://localhost:4000
// curl -X POST http://localhost:4000/users
// curl -X POST http://localhost:4000/users/1234
// curl -X PUT http://localhost:4000/users/1234
// curl -X POST http://localhost:4000 -H "Content-Type:application/json" -d '{"text": "Hi again, World"}'
 