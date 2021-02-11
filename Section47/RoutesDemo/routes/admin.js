const express = require('express');
const router = express.Router();

router.use((req,res,next) => {
    if (req.query.isAdmin) {
        next();
    } else {
        res.send("SORRY NOT AN ADMIN!");
    }
})

router.get('/topsecret', (req,res) => {
    res.send("TOP SECRET!");
});

router.get('/delete', (req,res) => {
    res.send('OK DELETED!');
});

module.exports = router;