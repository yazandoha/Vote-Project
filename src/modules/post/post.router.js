import { Router } from "express";
import * as functions from "./controller/post.controller.js";
import * as CommentFunction from "./controller/comment.controller.js";
import { auth, role } from "../../middlewear/auth.js";
import { HME, fileValidation, myMulter } from "../../services/multer.js";
import { endPoint } from "./post.endpoints.js";

const router = Router();

router.post('/:id/comment',auth(),CommentFunction.addComment);

// router.patch('/profilePic',auth(),myMulter(fileValidation.image).single('image'),HME,functions.profilePic);
router.post('/addPost',auth([role.Admin]),myMulter(fileValidation.image).array('image',5),HME,functions.addPost);
router.get('/getPost',functions.getPost);
router.get('/getPosts',auth(endPoint.getPost),functions.getPosts);

router.patch('/addLike/:id',auth(),functions.likePost);
router.patch('/addUnLike/:id',auth(),functions.UnlikePost);

export default router;