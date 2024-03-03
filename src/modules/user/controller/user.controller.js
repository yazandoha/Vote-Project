import userModel from "../../../../DB/model/user.model.js"
import geoip from 'geoip-lite'; 
import cloudinary from "../../../services/cloudinary.js";


export const profileData =async(req,res)=>{
    try{
        const user =await userModel.findById(req.user._id);
        res.status(200).json({message:"success",user});
    }catch(error){
        res.status(500).json({message:"error function API",error});
    }
}
export const profilePic=async(req,res)=>{
    try{
        if(!req.file){
            res.status(400).json({message:"plx upload profile pic"});
        }else{
            const {secure_url} = await cloudinary.uploader.upload(req.file.path,{
                folder:`user/${req.user._id}/profilePic`
            });
            const user = await userModel.findByIdAndUpdate(req.user._id,{profilePic:secure_url});
            res.status(200).json({message:"success"});
        }
    }catch(err){
        res.status(500).json({message:"catch error",err})
    }
}

export const profileCoverPic=async(req,res)=>{
    try{
        if(!req.files){
            res.status(400).json({message:"plx upload cover pic"});
        }else{
            const images = [];
            for (const file of req.files) {
                const {secure_url} = await cloudinary.uploader.upload(file.path,{
                    folder:`user/${req.user._id}/profileCoverPic`
                });
                images.push(secure_url);
            }
            const user = await userModel.findByIdAndUpdate(req.user._id,{coverPic:images});
            res.status(200).json({message:"success"});
        }
    }catch(err){
        res.status(500).json({message:"catch error",err})
    }

}
//this function to get info of the ip address   
export const ipAddress = async(req,res)=>{
    try{
        // const Ip = req.ip;
        const ip ='213.6.48.255';
        const geo = geoip.lookup(ip);
        console.log(geo);
        res.json({message:"success",geo});
        //31.891078, 35.181187
        
        //31.9014, 35.1999
    }catch(err){
        console.log(err);
    }
}
export const alluser = async(req,res)=>{
    try{    
        const users =await userModel.find({confirmEmail:true});
        res.status(200).json({message:"success",users});
    }catch(err){
        res.status(500).json({message:"error function API",error});
    }
}

  