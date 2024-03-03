import { Schema,Types,model } from "mongoose";
// or 
// import mongoose from "mongoose";
// then use mongoose.Schema or mongoose.model
const commentSchema = new Schema({
    text:{
        type:String,
        require:true
    },
    userId:{
        type:Types.ObjectId,
        require:true,
        ref:'user'
    },
    postId:{
        type:Types.ObjectId,
        require:true,
        ref:'post'
    }
},{timestamps:true})

export const commentModel = model('comment',commentSchema);