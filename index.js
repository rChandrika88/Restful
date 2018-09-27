const express = require('express');
const app = express();
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ninjago");
mongoose.Promise = global.Promise;

// app.get('/',(req, res)=>{
//     console.log("GET request");
//     res.end();
// });

app.use(express.static('./public'));
app.use(bodyParser.json());
//initialize routes
app.use('/api',routes);
//error handlish middleware
app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

let port = process.env.port || 4000;
app.listen(port, () => {
    console.log("now listening for requests at port " + port);
});