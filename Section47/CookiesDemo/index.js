const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser('thisissecret'));

app.get('/greet', (req,res) => {
    const { name = 'No-name' } = req.cookies;
    res.send(`HEY THERE ${name}!`);
});

app.get('/setname', (req,res) => {
    res.cookie('name', 'neko ime');
    res.send("OK SENT YOU A COOKIE!");
});

app.get('/getsignedcookie', (req,res) => {
    res.cookie('fruit','grape', { signed: true });
    res.send('Fruit cookie is signed');
});

app.get('/verifyfruit', (req,res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    res.send(req.signedCookies);
})

app.listen(3000, () => {
    console.log("Listening on 3000!");
});