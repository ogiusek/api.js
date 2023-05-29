const express = require('express');
const db = require('./db/db').db;

const app = express();
app.use(express.json());

// req.ip client address
// req.query data after '?' in url
// req.body get body of question
// app .post .get .remove .patch crud

app.get('/sql', (req, res) => {
    db.all('SELECT * FROM test;', [], (err, rows) => {
        if (err)
            return res.sendStatus(400);
        return res.json({ 'works': rows });
    });
});

app.post('/sql', (req, res) => {
    const body = req.body;
    if (body.uno && body.dos) {
        db.run('INSERT INTO test VALUES(?,?);', [body.uno, body.dos]);
        res.sendStatus(201);
    } else
        res.sendStatus(400);
});

const init = () => { };
app.listen(3000, init);
