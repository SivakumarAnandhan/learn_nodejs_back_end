const express = require('express');  //Importing the express middleware
const router = express.Router();  //Initialising the router instance 
const Product = require('../Models/Products'); //Importing the Product Mongo DB model
const multer = require('multer'); //Importing the Multer middleware
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');



var Storage = multer.diskStorage({
  destination: './appData/Images',
  filename: function(req,file,callback){
    callback(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
    }
});  

//Get the list of products from the database
router.get('/products',function(req,res,next){
	Product.find().then(function(products){
    res.send(products);
  });
});

//Add a new product to the database
router.post('/products',upload.single('image'),function(req,res,next){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files){ 
    Product.create(fields).then(function(product){
      res.send(product);
    }).catch(next);             
    });    
});

//Update a Product in the database
router.put('/products/:id',function(req,res,next){
  Product.findByIdAndUpdate({_id:req.params.id},req.body).then(function(product){
    Product.findOne({_id:req.params.id}).then(function(product){
      res.send(product);
      console.log('product');
    });
  });
});

//Delete a Product from the database
router.delete('/products/:id',function(req,res,next){
  Product.findByIdAndRemove({_id:req.params.id}).then(function(product){
    res.send(product);
  });
});

module.exports = router;
