import { Router } from "express";
import * as functions from "./controller/user.controller.js";
import { auth } from "../../middlewear/auth.js";
import { HME, fileValidation, myMulter } from "../../services/multer.js";
const router = Router();

router.get('/profile',auth(),functions.profileData);
router.get('/address',functions.ipAddress);
router.get('/alluser',functions.alluser);
// router.get('/confermEmail/:token',functions.confermEmail);
// router.post('/signin',functions.signin);
router.patch('/profilePic',auth(),myMulter(fileValidation.image).single('image'),HME,functions.profilePic);
router.patch('/profileCoverPic',auth(),myMulter(fileValidation.image).array('image',5),HME,functions.profileCoverPic);
export default router;