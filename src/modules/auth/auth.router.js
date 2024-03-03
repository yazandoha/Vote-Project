import { Router } from "express";
import * as functions from "./controller/auth.controller.js";
const router = Router();

router.post('/signup',functions.signup);
router.get('/confermEmail/:token',functions.confermEmail);
router.get('/signin',functions.signin);
router.post('/fun1',functions.fun1);
router.get('/fun2',functions.fun2);
export default router; 