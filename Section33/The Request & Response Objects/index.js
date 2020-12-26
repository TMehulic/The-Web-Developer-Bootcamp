const express = require('express');

const app  = express();

// app.use((req,res)=>{
//     console.dir(req);
// })

app.get('/test',(req,res)=>{
    res.send('Meni radi!');
})

app.get('/r/:subreddit',(req,res)=>{
    const {subreddit} = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`);
})

app.get('/r/:subreddit/:postId',(req,res) => {
    const { subreddit, postId} = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit, with the postId ${postId}</h1>`);
})

app.get('/search', (req,res) => {
    const { q } = req.query;
    if(!q){
        res.send('Nothing found if nothing searched');
    }{
        res.send(`Results for ${q}`);
    }
})
app.get('*',(req,res)=>{
    res.send('Response za sve rute koje se ne matchaju');
})
app.listen(8080, ()=>{
    console.log("PORT 8080");
})