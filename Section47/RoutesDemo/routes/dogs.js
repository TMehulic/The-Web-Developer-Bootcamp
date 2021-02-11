const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send("ALL DOGS");
});

module.exports = router;