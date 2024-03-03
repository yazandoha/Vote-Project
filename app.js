// const express = require('express')
import express from 'express';
// const dotenv = require('dotenv');
import dotenv from 'dotenv';
import cors from 'cors';

// Enable CORS for all routes
// const connectDB = require('./DB/connection');
import connectDB from './DB/connection.js';
import * as indexRouter from './src/modules/index.router.js';
const app = express();
const port = 3000;
app.use(cors());
dotenv.config({path:'./config/.env'}); //if the .env file in the same diroctiry in the app.js you dont add {path:'../../} in the config function
// but if the .env file is not in the same directory in the app.js you need to put the path
app.use(express.json());
connectDB();

app.use(`${process.env.baseUrl}/auth`,indexRouter.authRouter);
app.use(`${process.env.baseUrl}/user`,indexRouter.userRouter);
app.use(`${process.env.baseUrl}/post`,indexRouter.postRouter);
app.use('*',(req,res)=>{
    res.status(404).json({message:"page not found"});
})
 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));