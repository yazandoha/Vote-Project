import { Schema,Types,model } from "mongoose";
// or 
// import mongoose from "mongoose";
// then use mongoose.Schema or mongoose.model
const postSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    caption:{
        type:String,
        require:true,
    },
    userId:{
        type:Types.ObjectId,
        require:true,
        ref:'user',
    },
    image:{
        type: Array,
        require:true,
    },
    likes:[{type:Types.ObjectId,ref:'user'}],
    unlikes:[{type:Types.ObjectId,ref:'user'}],
    counts:{type:Number,default:0},
    commentsId:[{type:Types.ObjectId,ref:'comment'}],//thear is a table of comment becouse the comment is contain many feild like (text,date,user,...)
},{timestamps:true})

postSchema.post('findOneAndUpdate',async function(){
    // console.log("model is",this.model);
    // console.log("query is",this.getQuery()._id);
    let docToUpdate = await this.model.findOne({_id:this.getQuery()._id});
    docToUpdate.counts = docToUpdate.likes.length - docToUpdate.unlikes.length;
    docToUpdate.save();
})
const postModel=model('post',postSchema);
export default postModel;
// or
// export  const postModel = model('post',postSchema);