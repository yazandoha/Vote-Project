import {commentModel} from "../../../../DB/model/comment.model.js";
import postModel from "../../../../DB/model/post.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { pagination } from "../../../services/pagination.js";

export const addPost = async(req,res)=>{
    try{ // note :: must add i nthe cloudinary >> every post in file (not all in the same file )
        if(!req.files){
            res.status(400).json({message:"plx upload files"});
        }else{      
            const {title,caption} = req.body;
            const images = [];
            for (const file of req.files) {
                const {secure_url} = await cloudinary.uploader.upload(file.path,{
                    folder:`gallery/${req.user._id}/post`
                });
                images.push(secure_url);
            }
            const post = await postModel.create({title,caption,userId:req.user._id,image:images});
            res.status(201).json({message:"success",post});
        }
    }catch(err){
        res.status(500).json({message:"catch error",err});
    }
}

// this two functions (getPost ,getPost2) is use when i need to use parent-children between post and comment
// and set the commentId feild in the post model and in the comment model delete the postId 
export const getPost2 = async(req,res)=>{
    try{
        const posts = await postModel.find({}).populate({
            path:'commentsId',
            populate:({
                path:'userId',
                select:'userName profilePic'
            })
        }).populate({
            path:'userId',
            select:'userName profilePic'
        });
        res.status(200).json({message:"success",posts});
    }catch(err){
        res.status(500).json({message:"error catch",err});
    }
}
//this function same as the above but the defferent is the way of populate :
// getPost and getPost2 is the same work but the defferent is the way of population
export const getPost = async(req,res)=>{
    try{
        const posts = await postModel.find({}).populate([{
            path:'commentsId',
            populate:({
                path:'userId',
                select:'userName profilePic'
            })
        },{
            path:'userId',
            select:'userName profilePic'
        }])
        res.status(200).json({message:"success",posts});
    }catch(err){
        res.status(500).json({message:"error catch",err});
    }
}

// this function in the Children-parent case 2 (when i delete the commentId from the post model and set the postId feild in the comment model)
export const getPosts = async(req,res)=>{
    try{
        const {page,size} = req.query;
        const {limit,skip}=pagination(page,size);
        const posts = await postModel.find({}).limit(limit).skip(skip).populate([{
            path:'userId',
            select:'userName -_id' //-_id means that dont show the _id feaild
        }]);
        const postList=[];
        for (const post of posts) {
            let comments = await commentModel.find({postId:post._id});

            postList.push({post,comments});
        }
        res.status(200).json({message:"success",postList});
    }catch(err){
        res.status(500).json({message:"error catch",err});
    }
}

export const likePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const PostLike = await postModel.findOneAndUpdate({_id:id},
            {
                $addToSet:{likes:req.user._id}, //addToSet is the same as push , but the defferent is push can add the same value more one time but the addToSet is add the value just 1 time
                //means that the user can't add two like in the same post
                $pull:{unlikes:req.user._id}, // this mean remove the unlike user in the post if found , if not found not do anything
                
            },{new:true});
        if(!PostLike){
            res.status(401).json({message:"error add like"});
        }else{
            res.status(201).json({message:"success",PostLike});
        }
    }catch(err){
        res.status(500).json({message:"catch error",err});
    }
}
export const UnlikePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const PostLike = await postModel.findOneAndUpdate({_id:id},
            {
                $addToSet:{unlikes:req.user._id},
                $pull:{likes:req.user._id},
                
            },{new:true});
        if(!PostLike){
            res.status(401).json({message:"error add unlike"});
        }else{
            res.status(201).json({message:"success",PostLike});
        }
    }catch(err){
        res.status(500).json({message:"catch error",err});
    }
}