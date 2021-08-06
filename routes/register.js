const express = require('express');
const router = express.Router();

const user = require('../Models/user');

router.post('/register',(req,res,next) => {
    let newUser = new user();
    newUser.userName = req.body.userName,
    newUser.userEmail = req.body.userEmail,
    //newUser.password = req.body.password
    newUser.setPassword(req.body.password);
    newUser.save((err,user) => {
        if(err){
            return res.status(401).send({
                message: "Failed to register."
            });
        }
        else {
            return res.status(201).send({
                message: "User registered successfully."
            });        
        }
    });
});

router.post('/login',(req,res,next) =>{
    console.log('req');
    user.findOne({userEmail: req.body.userEmail},function(err,user){
        if(user === null) {
            return res.status(404).send(
                {
                    message: "user not find"
            });
        }
        else {
            if (user.validatepassword(req.body.password)){
                return res.status(201).send(
                    {
                        message: "User Logged in successfully"
                });
            }
            else {
                return res.status(400).send({ 
                    message : "Wrong Password"
                });
            }
        }
    });
});
module.exports = router;
