const mongoose = require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser : true, useUnifiedTopology: true})
.then(() => {
    console.log("Mongo connection open!");
})
.catch(err => {
    console.log("Error : ", err);
});

const userSchema = new Schema({
    username: String,
    age: Number
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     const user = new User({username: 'user123', age: 61});
//     const t1 = new Tweet({text: 'omg i am user', likes: 0});
//     t1.user = user;
//     user.save();
//     t1.save();
// }

// makeTweets();

const findTweet = async() => {
    const t = await Tweet.findOne({}).populate('user');
    console.log(t);
}

findTweet();

