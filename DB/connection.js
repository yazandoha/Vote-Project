import mongoose from "mongoose"; //es6
// const mongoose = require('mongoose'); //es5
const connectDB =async()=>{
    return await mongoose.connect(process.env.DBURL)
    .then(res=>{
        console.log("connect DB");
    }).catch(error=>{
        console.log("error connection DB",error);
    });
}
export default connectDB
//module.exports={connectDB}