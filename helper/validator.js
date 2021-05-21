const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const { schema } = require('../models/blog');

const registerValidate = (data)=>{
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email : Joi.string().min(5).required().email(),
        password : passwordComplexity().required()
    });
    return schema.validate(data);
};

const loginValidate = (data)=>{
    const schema = Joi.object({
        email : Joi.string().min(5).required().email(),
        password : passwordComplexity().required()
    });
    return schema.validate(data);
};

const blogValidate = (data)=>{
    const schema = Joi.object({
        title : Joi.string().min(2).max(20).required(),
        body : Joi.string().min(1).max(1000).required()
    });
    return schema.validate(data);
};

const blogPutValidate = (data)=>{
    const schema = Joi.object({
        title:Joi.string().min(2).max(20),
        body : Joi.string().min(1).max(1000)
    }).min(1);
    return schema.validate(data);
};

const commentValidate = (data)=>{
    const schema = Joi.object({
        text: Joi.string().min(1).max(50).required()
    });
    return schema.validate(data);
};


module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
module.exports.blogValidate = blogValidate;
module.exports.blogPutValidate = blogPutValidate;
module.exports.commentValidate = commentValidate;