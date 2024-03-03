import { commentModel } from "../../../../DB/model/comment.model.js";
import  postModel  from "../../../../DB/model/post.model.js"


export const addComment = async(req,res)=>{
    try{
        const {text} = req.body;
        const {id} = req.params;
    
        const post =await postModel.findById(id);
        if(!post){
            res.status(404).json({message:"post not found"}); 
        }else{
            const comment = await commentModel.create({text,userId:req.user._id,postId:id});
            // await postModel.findByIdAndUpdate(id,{$push:{commentsId:comment._id}}); // this line if i need to add the feild array of comment in the post module i need to use this line to posh the comment in the post array 
            res.status(201).json({message:"add comment true",comment}); 
        }
    }catch(err){
        res.status(500).json({message:"catch error",err});
    } 
}