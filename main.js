const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const port = 3000;
const db = new sqlite3.Database('./data.db');
const { validateUser, createUser } = require("./database");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Olá mundo!');
})

app.post('/', (req, res) => {    
    res.send('Server on');
})

app.post('/login', (req, res) => {

    let user = req.body.user;
    let password = req.body.password;

    console.log(user, password);
    
    if(!user || !password) {
        res.send("Missing data");
        return;
    }

    validateUser(user, password, (data) => {
        res.send(data);
    })

})

app.post('/create', (req, res) => {

    let user = req.body.user;
    let password = req.body.password;

    if (!user) {
        res.send("user missing");
    }

    if (!password) {
        res.send("password missing");
    }

    createUser(user, password, (result) => {
        res.send(result);
    });
})

app.listen(port, (req, res) => {
    console.log(`Server on port ${port}`);
})