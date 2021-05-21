const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');

exports.isAuthenticated=(req,res,next)=>{
    console.log("middle ",req.body);
    let token = req.header('Authorization');
    if(!token)
        return res.status(400).send("User is not Authenticated !!");
    token = token.replace("Bearer ","");
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err)
            return res.status(400).send("Invalid Token!!");
        req.user = decoded;
        console.log(decoded);
        next();
    });
};

exports.isValidUser=(req,res,next)=>{
    console.log("Valid",req.body,req.params);
    const {id}=req.params;
    Blog.findOne({_id:id}).populate('postedBy').exec((err,data)=>{
        if(err){
            return res.status(400).send("Blog does'nt exist in databse");
        }
        if(data.postedBy._id!=req.user._id){
            return res.status(400).send("User not allowed to make changes to requested Blog");
        }
        next();
    });
};