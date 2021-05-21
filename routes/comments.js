const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middlewares/authenticate');
const Blog = require('../models/blog');
const {commentValidate}  = require('../helper/validator');


router.get('/getComments/:id',(req,res)=>{
    const {id}=req.params;
    Blog.findOne({_id:id}).populate('comments.postedBy','name').exec((err,data)=>{
        if(err)
            return res.status(422).send("Unable to fetch data from server !");
        console.log(data);
        res.status(200).send(data.comments);
    });
});


router.put('/createComment/:id',isAuthenticated,(req,res)=>{
    const {error} = commentValidate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    const comment={
        text:req.body.text,
        postedBy : req.user._id
    };
    const {id}=req.params;
    Blog.findByIdAndUpdate(id,{$push:{comments:comment}},{new:true,useFindAndModify : false}).populate('comments.postedBy','name').exec((err,data)=>{
        if(err)
            return res.status(400).send("Unable to update requested Blog");
        res.status(200).send(data);
    });
});

module.exports = router;



