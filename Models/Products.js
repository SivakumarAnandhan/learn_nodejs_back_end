const mongoose = require('mongoose');  //Importing the Mongoose middleware to connect MongoDB
const schema = mongoose.Schema; //Crearting a schema instance

//Create a product schema and model
const productschema = new schema({
  ProductName: {
    type: String,
    required: [true, 'Name field is required']
  },
  ProductPrice:{
    type: Number
  },
  ActiveIndicator:{
    type: Boolean,
    default: true
  }
});

const product = mongoose.model('product',productschema);

module.exports = product;
