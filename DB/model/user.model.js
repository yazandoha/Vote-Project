import { Schema,model } from "mongoose";
// or 
// import mongoose from "mongoose";
// then use mongoose.Schema or mongoose.model
const userSchema = new Schema({
    userName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    age:Number,
    gender:{
        type:String,
        default:'male',
        enum:["male","female"],
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    profilePic:String,
    coverPic:Array,
    phone:{
        type:String,
    },
    role:{
        type:String,
        default:'User',
        enum:['User','Admin']
    }
},{timestamps:true})

const userModel=model('user',userSchema);
export default userModel;
// or
// export const userModel = model('user',userSchema);