const express = require('express');
const router = express.Router();
const {isAuthenticated,isValidUser} = require('../middlewares/authenticate');
const Blog = require('../models/blog');
const {blogValidate,blogPutValidate}  = require('../helper/validator');

router.post('/create',isAuthenticated,(req,res)=>{
    console.log(req.body);
    const {title,body} = req.body;
    const {error} = blogValidate({title,body});
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    const blog = new Blog({
        title,
        body,
        postedBy:req.user._id
    });
    blog.save((err,post)=>{
        if(err){
            return res.status(400).send(err);
        }
        res.status(200).send(post);
    });
});

router.get('/getAll',(req,res)=>{
    Blog.find({}).populate('postedBy','name').populate('comments.postedBy','name').exec((err,data)=>{
        if(err)
            return res.status(422).send("Unable to fetch data from server !");
        res.status(200).send(data);
    });
});

router.get('/getBlog/:id',(req,res)=>{
    const {id}=req.params;
    Blog.findOne({_id:id}).populate('postedBy','name').populate('comments.postedBy','name').exec((err,data)=>{
        if(err)
            return res.status(422).send("Unable to fetch data from server !");
        res.status(200).send(data);
    });
});

router.delete('/deleteBlog/:id',isAuthenticated,isValidUser,(req,res)=>{
    const {id}=req.params;
    Blog.deleteOne({_id:id},err=>{
        if(err)
            return res.status(422).send("Unable to delete blog !!");
        res.send("Blog succcessfully Deleted ");
    });
});

router.put('/updateBlog/:id',isAuthenticated,isValidUser,(req,res)=>{
    console.log(req.body);
    const {error} = blogPutValidate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    const {id}=req.params;
    Blog.findByIdAndUpdate(id,{$set:req.body},{new:true,useFindAndModify : false},(err,data)=>{
        if(err)
            return res.status(400).send("Unable to update requested Blog");
        res.status(200).send(data);
    });
});

module.exports = router;



