let express = require('express');
let url = require('url');
let path = require('path');
let bodyParse = require('body-parser');
let router = require('./router');
let port = process.env.PORT || 9999;

var app = express();
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended:false}));


app.use(router);



app.listen(port,() => {

}) 