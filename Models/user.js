const mongoose = require('mongoose');  //Importing the Mongoose middleware to connect MongoDB
const crypto = require('crypto');
const schema = mongoose.Schema; //Crearting a schema instance

//Create a product schema and model
const userschema = new schema({
  userName: {
    type: String,
    required: [true, 'Name field is required']
  },
  userEmail: {
    type: String,
    requird: [true, 'Password is required']
  },
  hash: String,
  salt: String
});

userschema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
};

userschema.methods.validatepassword = function(password){
        var hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
        return this.hash === hash;
};

const user = mongoose.model('user',userschema);

module.exports = user;
