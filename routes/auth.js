const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {registerValidate,loginValidate}  = require('../helper/validator');

router.post('/register',(req,res)=>{
    console.log("body ",req.body);
    const {error} = registerValidate(req.body);
    if(error){
        return res.status(422).send(error.details[0].message);
    }
    const {name,email,password} = req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            return res.status(400).send("User with given email already exists!!");
        }
    });
    bcrypt.hash(password, 12, function(err, hash) {
        if(err){
            return res.status(400).send(err);
        }
        const user = new User({
            name,
            email,
            password:hash   
        });
        user.save((err, user) => {
            if(err){
                return res.status(400).json(
                    {
                        err: "NOT ABLE TO SAVE USER IN DATABASE",
                    }
                );
            }
            
            res.send(user);
        });
    });
});

router.post('/login',(req,res)=>{
    const {error} = loginValidate(req.body);
    if(error){
        return res.status(422).send(error.details[0].message);
    }
    const {email,password} = req.body;
    User.findOne({email:email},(err,user)=>{
        if(err || !user){
            return res.status(400).send("Given email does'nt exist. Please Signup first!!");
        }
        bcrypt.compare(password,user.password,(err,result)=>{
            if(err){
                return res.status(400).send(err);
            }
            if(result){
                const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{
                    expiresIn:"1d",
                });
                res.header("auth-token",token).send(token);
            }else{
                return res.status(400).send("Incorrect email or password !");
            }
        })
    });
});

module.exports = router;



