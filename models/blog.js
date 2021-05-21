const mongoose = require('mongoose');
const { Schema } = mongoose;
const blogSchema = new Schema({
        title: {
            type: String,
            required: true,
            trim:true,
            maxLength: 60
        },
        body: {
            type: String,
            required: true,
            trim:true,
            maxLength: 1000
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        comments :[{
            text : String,
            postedBy : {type : Schema.Types.ObjectId , ref: "User"}
        }],
    },
    {timestamps:true}
);

module.exports = mongoose.model("Blog", blogSchema);