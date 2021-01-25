const mongoose = require('mongoose');
const { Schema } = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("CONNECTION OPEN");
})
.catch(err => {
    console.log("ERROR: ", err);
});

const personSchema = new Schema({
    first: String,
    last: String
});

personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
});

const Person = mongoose.model('Person', personSchema);

const tammy = new Person({first: 'Tammy', last: 'Chow'});
console.log(tammy.fullName);
//tammy.save();
