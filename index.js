const express = require('express'); //Importing the express middleware
const bodyparser = require('body-parser'); //Importing the body-parser middleware to parse the json
const mongoose = require('mongoose');  //Importing the mongoose to do mongoDB operations
const app = express(); //Setup express app instance

mongoose.connect('mongodb://localhost/products'); //connect to mongoDB
mongoose.Promise = global.Promise;  //Making mongoose queries promisable 

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json()); //Using body parser middleware to parse Json inputs

app.use('/api',require('./routes/api')); //Initialising the routes using a middleware
app.use('/user',require('./routes/register'));
//Error handling middleware
app.use(function(err,req,res,next){
  res.status(422).send({error:err.message});
});

//Making the site to Listen for requests
app.listen(process.env.port || 4000,function(){
  console.log('now listening for requests');
});



