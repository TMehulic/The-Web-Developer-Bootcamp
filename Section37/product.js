const mongoose = require('mongoose');
const { Schema } = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("CONNECTION OPEN");
})
.catch(err => {
    console.log("ERROR: ", err);
});

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be positive!']
    },
    onSale : {
        type: Boolean,
        default: false
    },
    categories : [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore : {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

//Methods

productSchema.methods.greet = function() {      //Ne koristiti arrow, zbog this
    console.log("HELLO");
    console.log(`- from ${this.name}`);
}

productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale;
    return this.save();    //Save da bi bilo efekta 
}

//Static methods

productSchema.statics.fireSale = function() {
    return this.updateMany({}, {onSale: true, price: 0});
}


//Middleware

productSchema.pre('save', async function(){
    console.log("Pre save!!!");
});

productSchema.post('save', async function(){
    console.log("Post save!!!");
})

const Product = mongoose.model('Product', productSchema);

Product.fireSale().then(res => console.log(res));



const findProduct = async() => {
    const foundProduct = await Product.findOne({name: 'Bike Helmet'});
    foundProduct.greet();
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
}

findProduct();

// const bike = new Product({name: 'Tire Pump', price: 19.50, categories: ['Cycling']});
// bike.save()
//     .then(data => {
//         console.log("SUCCESS");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("ERROR");
//         console.log(err);
//     });

//Product.findOneAndUpdate({name: 'Tire Pump'}, { price: -99}, {new:true, runValidators:true}).then(data => console.log(data));

// const bike = new Product({name: 'Jersey', price: 28.50, categories: ['Cycling'], size: 'S'});
// bike.save()
//     .then(data => {
//         console.log("SUCCESS");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log("ERROR");
//         console.log(err);
//     });