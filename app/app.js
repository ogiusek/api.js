const express = require('express');
const db = require('../db/db').db;

const app = express();
app.use(express.json());

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

app.get('/', (req, res) => {
    res.json({ "jesus": "loves you" });
});

app.post('/', (req, res) => {
    const body = req.body;

    res.json({ 'works': '' });
});

module.exports = {
    app: app
};
