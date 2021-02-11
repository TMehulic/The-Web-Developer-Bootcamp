const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const AppError = require('./AppError');
const session = require('express-session');
const flash = require('connect-flash');

const sessionOptions = {
    secret : 'thisisnotagoodsecret',
    resave : false,
    saveUninitialized : false
}

app.use(session(sessionOptions));
app.use(flash());

const Product = require('./models/product');
const Farm = require('./models/farm');

mongoose.connect('mongodb://localhost:27017/farmStandTake2', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO CONNECTION OPEN");
})
.catch(err => {
    console.log("MONGO ERROR: ", err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];



//FARM ROUTES

app.use((req,res,next) => {
    res.locals.messages = req.flash('success');
    next();
})

app.get('/farms', async (req,res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
});

app.get('/farms/new', (req,res) => {
    console.log("OVDJE");
    res.render('farms/new');
});

app.get('/farms/:id', async (req,res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm });
})



app.post('/farms', async (req,res) => {
    const farm = new Farm(req.body);
    await farm.save();
    req.flash('success', 'Successfully made a new farm!');
    res.redirect('/farms');
});

app.get('/farms/:id/products/new', async (req,res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm });
});

app.post('/farms/:id', async(req,res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category});
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
});

app.delete('/farms/:id', async (req,res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    
    res.redirect('/farms');
})


function wrapAsync(fn) {
    return function(req,res,next){
        fn(req,res,next).catch(e => next(e));
    }
}


const handleValidationError = err => {
    console.dir(err);
    return new AppError(`Validation Failed...${err.message}`,400);
}

app.use((err,req,res,next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationError(err);
    next(err);
})

app.use((err,req,res,next) => {
    const { status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
});





app.listen(3000, () => {
    console.log("APP IS LISTENING");
});