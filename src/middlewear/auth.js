import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";
/*
this function to check if the user is signin or not
the function take the token from front end and decode the token and check if the id is in the DB or not 
if the id is true then do next() to the function 
(the auth is work as firewall)
*/
export const auth =()=>{
    return async(req,res,next)=>{
        try{
            let {token}=req.headers;
            if(!token.startsWith("yazan__")){
                res.status(400).json({message:"invalid bearer token"});
            }else{
                token = token.split("yazan__")[1];
                const decoded = await jwt.verify(token,process.env.TOKENLOGIN);
                if(decoded.id){
                    const user = await userModel.findById(decoded.id).select('_id');
                    if(user){
                        req.user=user;
                        next();
                    }else{
                        res.status(401).json({message:"fail  user"});
                    }
                }else{
                    res.status(400).json({message:"invalid token payload"});
                }
            }   
        }catch(err){
            res.status(500).json({message:"error auth funtion",err});
        }
    }
} 