const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');


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
    throw new AppError("Password Required", 401);
    // throw new Error('Password required!');
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

app.get('/error', (req,res) => {
    chicken.fly();
});

app.get('/admin', (req,res) => {
    throw new AppError("You are not an admin!", 403);
})

app.use((req,res) => {
    res.status(404).send('NOT FOUND!');
});

// app.use((err,req,res,next) => {
//     console.log("***********************************");
//     console.log("**************ERROR**************");
//     console.log("***********************************");
//     next(err);
// })

app.use((err,req,res,next) => {
    const { status = 500 } = err;
    const { message = 'Something went wrong!' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});