const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 60,
    },
    email:{
        type:String,
        required:true,
    },
    password :{
        type:String,
        required:true,
    },
});


module.exports = mongoose.model("User", userSchema);