const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelter');
const dogsRoutes = require('./routes/dogs');
const adminRoutes = require('./routes/admin');


app.use('/admin', adminRoutes);
app.use('/shelters', shelterRoutes);
app.use('/dogs', dogsRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000!");
})