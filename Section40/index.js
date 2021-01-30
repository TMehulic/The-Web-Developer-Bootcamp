const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('common'));
app.use((req,res,next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
});

app.use('/dogs', (req,res,next) => {
    console.log('I love dogs!');
    next();
});

//Zaštita specific ruta

const verifyPassword = (req,res,next) => {
    const { password } = req.query;
    if (password === 'pass'){
        next();
    }
    res.send('SORRY YOU NEED A PASSWORD!!!');
};

app.get('/secret', verifyPassword, (req,res) => {
    res.send("SECRET HEHE");
});

app.get('/dogs', (req,res) => {
    res.send("WOOF WOOF");
});

app.get('/', (req,res) => {
    console.log(`Request date: ${req.requestTime}`);
    res.send('HOME PAGE!');
});

app.use((req,res) => {
    res.status(404).send('NOT FOUND!');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});